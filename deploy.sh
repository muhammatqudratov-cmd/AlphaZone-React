#!/bin/bash

#PRODUCTION 
git reset --hard 
git checkout main
git pull origin main

npm i yarn -g
yarn global add serve
yarn  
yarn build
pm2 start "yarn run start:prod" --name=AlphaZone-React 


#DEVELOPMENT
# git reset --hard
# git checkout develop
# git pull origin develop
# yarn install
# pm2 start "yarn run start:dev" --name=AlphaZone 

