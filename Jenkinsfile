#!groovy

pipeline {
    agent any
    
    environment {
        DOCKER_HUB_ACCOUNT='gmanweb'
        APPLICATION_NAME='ninja'
        APPLICATION_TAG_VERSION='v0.0.1-rc3'
    }
    
    stages {
        
        stage('Docker Build') {
            agent any
            steps {
                sh "docker build -t ${env.DOCKER_HUB_ACCOUNT}/${env.APPLICATION_NAME}:${env.APPLICATION_TAG_VERSION} ."
            }
        }
  
    }
}
