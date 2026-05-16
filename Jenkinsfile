pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/SalifAbdoulSow18/real-estate-app.git',
                    credentialsId: 'github-credentials'
            }
        }

        stage('Build') {
            steps {
                echo 'Building..Tu dois marcher le build'
                // Add your build steps here
            }
        } 
        stage('Test') {
            steps {
                echo 'Testing...'
                // Add your test steps here
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Add your deploy steps here
            }
        }
    }
}