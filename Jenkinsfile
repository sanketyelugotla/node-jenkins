pipeline {
    agent any

    environment {
        IMAGE_NAME = "sanketyelugotla/node"
        TAG = "latest"
        CONTAINER_NAME = "node-cont"
    }

    stages {
        stage("Clone repo") {
            steps {
                git branch: "main", url: 'https://github.com/sanketyelugotla/node-jenkins'
            }
        }

        stage("Build image") {
            steps {
                bat "docker build -t $IMAGE_NAME:$TAG ."
            }
        }

        stage("Login to docker") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DOCKER_CREDENTIALS', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                }
            }
        }

        stage("Push to docker hub") {
            steps {
                bat "docker push $IMAGE_NAME:$TAG"
            }
        }

        stage("Deploy") {
            steps {
                bat "docker run -d -p 8085:80 --name $CONTAINER_NAME $IMAGE_NAME:$TAG"
            }
        }
    }

    post {
        success {
            echo "Succes∑"
        }

        failure {
            echo "Failed"
        }
        always {
            bat 'docker logout'
        }
    }
}