pipeline {
    agent any
     environment {
        GITHUB_USERNAME = 'SalifAbdoulSow18'
        DOCKER_HUB_USERNAME = 'sasow'
        DOCKER_HUB_REPO = 'real-estate-app'
        IMAGE_NAME = "${DOCKER_HUB_USERNAME}/${DOCKER_HUB_REPO}"
        K8S_NAMESPACE = 'real-estate-app'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/SalifAbdoulSow18/real-estate-app.git',
                    credentialsId: 'github-credentials'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🐳 Build de l'image Docker..."
                script {
                    sh """
                        docker build -t ${IMAGE_NAME}:latest .
                        docker tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:${env.GIT_COMMIT}
                    """
                }
                echo "✅ Image buildée"
            }
        }

        
    }
}