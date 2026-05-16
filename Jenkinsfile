pipeline {
    agent any
     environment {
        GITHUB_USERNAME = 'SalifAbdoulSow18'
        DOCKER_HUB_USERNAME = 'sasow'
        DOCKER_HUB_REPO = 'real-estate-app'
        IMAGE_NAME = "${DOCKER_HUB_USERNAME}/${DOCKER_HUB_REPO}"
        K8S_NAMESPACE = 'real-estate-app'
        IP = 'demystops.com' // Remplacez par l'IP de votre cluster si nécessaire
    }

    stages {

        stage('Check Commit Author') {
            steps {
                script {
                    def commitMessage = sh(
                        script: 'git log -1 --pretty=%B', 
                        returnStdout: true
                    ).trim()
                    
                    echo "Message du commit: ${commitMessage}"
                    
                    if (commitMessage.contains('[skip ci]')) {
                        currentBuild.result = 'NOT_BUILT'
                        error("⏭️ Build ignoré car le commit contient [skip ci]")
                    }
                    
                    echo "✅ Build déclenché par un vrai commit"
                }
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/SalifAbdoulSow18/real-estate-app.git',
                    credentialsId: 'github-credentials'
            }
        }

        stage('Read Version') {
            steps {
                script {
                    // Lire la version actuelle
                    def versionFile = readFile('VERSION').trim()
                    env.APP_VERSION = versionFile
                    echo "📌 Version actuelle: ${env.APP_VERSION}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🐳 Build de l'image Docker..."
                script {
                    sh """
                        docker build -t ${IMAGE_NAME}:${env.APP_VERSION} .
                        docker tag ${IMAGE_NAME}:${env.APP_VERSION} ${IMAGE_NAME}:latest
                    """
                }
                echo "✅ Image buildée"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "📤 Push vers Docker Hub..."
                withCredentials([string(credentialsId: 'docker-hub-password', variable: 'DOCKER_PASS')]) {
                    sh """
                        echo "${DOCKER_PASS}" | docker login -u ${DOCKER_HUB_USERNAME} --password-stdin
                        docker push ${IMAGE_NAME}:latest
                        docker push ${IMAGE_NAME}:${env.APP_VERSION}
                        docker logout
                    """
                }
                echo "✅ Image poussée sur Docker Hub"
            }
        }

        stage('Update Git Manifests') {
            steps {
                echo "📝 Mise à jour du tag dans les manifests..."
                withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                    sh """
                        # Mettre à jour l'image dans deployment.yaml avec la nouvelle version
                        sed -i "s|image: ${IMAGE_NAME}:.*|image: ${IMAGE_NAME}:${env.APP_VERSION}|" k8s/deployment.yaml
                        
                        git config user.email "jenkins@immoapp.com"
                        git config user.name "Jenkins CI"
                        git add k8s/deployment.yaml
                        git commit -m "release: update image to ${env.APP_VERSION} [skip ci]" || echo "No changes"
                        git push https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/real-estate-app.git main
                    """
                }
                echo "✅ Manifests mis à jour sur GitHub"
            }
        }

        stage('Create GitHub Release') {
            steps {
                withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                    sh """
                        git tag -a ${env.APP_VERSION} -m "Release ${env.APP_VERSION}" || true
                        git push https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/real-estate-app.git ${env.APP_VERSION} || true
                    """
                }
            }
        }

        
    }

    post {
        success {
            script {
                // ⭐ INCÉMENTER LA VERSION APRÈS SUCCÈS ⭐
                def currentVersion = env.APP_VERSION
                def parts = currentVersion.split('\\.')
                def newPatch = parts[2].toInteger() + 1
                def newVersion = "${parts[0]}.${parts[1]}.${newPatch}"
                
                // Mettre à jour le fichier VERSION
                writeFile(file: 'VERSION', text: newVersion)
                
                // Commit et push de la nouvelle version
                withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                    sh """
                        git config user.email "jenkins@immoapp.com"
                        git config user.name "Jenkins CI"
                        git add VERSION
                        git commit -m "chore: bump version to ${newVersion} [skip ci]"
                        git push https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/real-estate-app.git main
                    """
                }
                
                echo """
                ════════════════════════════════════════════════════════════════
                ✅ PIPELINE RÉUSSI !
                ════════════════════════════════════════════════════════════════
                
                📦 Version déployée: ${currentVersion}
                🔄 Prochaine version: ${newVersion}
                🐳 Image: ${IMAGE_NAME}:${currentVersion}
                
                🌐 Application: http://${IP}:30085
                
                ════════════════════════════════════════════════════════════════
                """
            }
        }
        failure {
            echo "❌ PIPELINE ÉCHOUÉ - Version ${env.APP_VERSION} non incrémentée"
        }
    }
}