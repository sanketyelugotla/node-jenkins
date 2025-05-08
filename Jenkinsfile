pipeline {
    agent any

    environment {
        IMAGE_NAME: "sanketyelugotla/node"
        TAG: "lates"
        CONTAINER_NAME: "node-cont"
    }

    stages {
        stage("Clone repo") {
            git branch: "main", url: 'https://github.com/sanketyelugotla/node-jenkins'
        }

        stage("Build image") {
            bat "docker build -t $IMAGE_NAME:$TAG ."
        }

        stage("Login to docker") {
            withCredentials([usernamePassword(credentialsId: 'DOCKER_CREDNTIALS', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                bat "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
            }
        }

        stage("Push to docker hub") {
            bat "docker push $IMAGE_NAME:$TAG"
        }

        stage("Deploy") {
            bat "docker run -p 8085:80 --name $CONTAINER_NAME $IMAGE_NAME:$TAG"
        }
    }
}