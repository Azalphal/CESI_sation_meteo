#!/bin/bash

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL server
sudo apt-get install -y mysql-server

# Install Git
sudo apt-get install -y git

# Clone the GitHub repository
git clone https://github.com/Azalphal/CESI_station_meteo.git

# Install express globally
npm install -g express

# Install npm packages
npm install

#UTILISER SEQUELIZE CLI POUR CA
# Create the MySQL database and tables
echo "CREATE DATABASE IF NOT EXISTS Weather_Station;" | mysql -u root -p
echo "USE Weather_Station;" | mysql -u root -p
cat db/schema.sql | mysql -u root -p

# Start the application
npm start