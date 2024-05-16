#!/bin/bash

face="\(^_^)"
negativeFace="(T_T)"
nodeV="node -v"
yarnV="yarn -v"
dockerV="docker -v"
composerV="composer -V"

composerUp="composer update"
yarnIn="yarn install"
dcUpD="docker-compose up -d"
dcPs="docker-compose ps"

function docker_status() {
  # node バージョン確認
  echo "${face} node version"
  eval $nodeV

  # yarn バージョン確認
  echo "${face} yarn version"
  eval $yarnV

  # docker バージョン確認
  echo "${face} docker version"
  eval $dockerV

  # composer バージョン確認
  echo "${face} Composer version"
  eval $composerV

  # composer アップデート実施
  echo ">>-- Composer Update ---------->>>>>>"
  cd src/laravel
  eval $composerUp
  cd ../../

  # node_modules install
  echo ">>-- node_modules install ---------->>>>>>"
  cd src/client
  eval $yarnIn
  cd ../../

  # docker-compose up -d dockerの立ち上げ
  echo ">>-- docker compose build ---------->>>>>>"
  eval $dcUpD

  # docker-compose ps dockerの状態確認
  echo ">>-- docker compose ps ---------->>>>>>"
  eval $dcPs
}

function error_func() {
  echo "⚠️⚠️⚠️  ${negativeFace} ⚠️⚠️⚠️  docker desktop is not up!!"
  echo "---->>> please launch docker desktop."
  echo ">>-----------------------------------"
  echo "|                                   |"
  echo "| $ open -a docker                  |"
  echo "|                                   |"
  echo "----------------------------------->>"
}

$dcPs
if [ $? -gt 0 ]; then
  error_func
else
  docker_status
fi
