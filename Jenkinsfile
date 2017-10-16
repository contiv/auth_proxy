#!groovy
pipeline {
  agent { label 'public' }
  options {
    timeout(time: 30, unit: 'MINUTES')
  }
  stages {
    stage('CI') {
      steps {
        sh '''
          set -euo pipefail
          make ci
        '''
      }
    }
  }
}
