#!/bin/bash
sudo apt-get update && sudo apt-get upgrade -y
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install python-software-properties python g++ make nodejs git mongodb redis-server -y
git clone https://github.com/codefellows/oaa.git
cd oaa
sudo npm -g install grunt-cli bower foreman
npm install
bower install
cp .env.example .env
# somehow put secret values in here
