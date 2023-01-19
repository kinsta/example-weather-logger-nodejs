# Kinsta - Example Application - Weather Logger with Node.js
A small Node.js based weather data logging application, the purpose of which is to test deployment flows for Kinsta Application Hosting. Once running, the application will log the temperature and wind speed in a given location once every minute and allow you to view the last 100 entries on a web server. 

---
Kinsta is a developer-centric cloud host / PaaS. We’re striving to make it easier for you to share your web projects with your users. Focus on coding and building, and we’ll take care of deployment and provide fast, scalable hosting. + 24/7 expert-only support.

Get started for free, the first $20 is on us!

[Application Hosting](https://kinsta.com/application-hosting)

[Database Hosting](https://kinsta.com/database-hosting)

## Supported Databases
To be able to test multiple databases on Kinsta you can use environment variables to change the database used by the application (more on specific setup below). The following databases are supported: 
* MySQL
* MariaDB
* PostgreSQL
* Redis

## Getting an OpenWeatherMap Key
The app will require an API key from [OpenWeatherMap](https://home.openweathermap.org). If you sign up you can grab an API key for free that should allow you to make 1,000 API calls a day. Once logged in you should be able to [create a key](https://home.openweathermap.org/api_keys) which you'll need to use in an environment variable (see below). Note that it will take a few minutes for your new key to become active and allow requests through.  

## Environment Variables
The application requires the following variables

* `OPENWEATHER_KEY`: The API key you generated for OpenWeatherMap services
* `WEATHER_LOCATION`: A location to get weather for, for example: `paris`, `tokyo`. If not given the default is `paris`
* `DB_TYPE`: The type of database you'd like to use. Should be one of the following: `mysql`, `mariadb`, `postgresql`, `redis`.  If not given the default is `mysql`
* `UNIT`: The unit of measurement you'd like to use. `metric` for Celsius and km/h or `imperial` for Fahrenheit and mi/h.  If not given the default is `metric`
* `FREQUENCY` The frequency with which to grab new weather data, 1-60 to represent every 1 minute to every 60 minutes.  If not given the default is `3`
* `DB_HOST`: The hostname of your database
* `DB_PORT`: The port through which the database can be accessed
* `DB_NAME`: The name of the database
* `DB_USER`: The username used to access the database
* `DB_PASSWORD`: The password used to access the database

Note that if using Redis `DB_NAME` and `DB_USER` should **not** be set. In addition, Redis will only store the most recent weather data. 

## Local Setup
1. Fork this repository 
2. Clone your forked repository locally
3. Run `npm i` in the resulting folder to install dependencies
4. Create a file named `.env` and add the environment variables to it. Take a look at [.env.example](.env.example) for an example. 
5. Make sure your database is up and running, ready to accept connections
6. Run `npm run setup` to create the required database table

## Available Commands
Once everything is set up correctly you should be able to issue the following commands:

* `npm run getWeather`: Retrieves the latest weather data from OpenWeatherMap
* `npm run logWeather`: Retrieves the latest weather data and adds it to the database
* `npm run listWeather`: Lists the latest 100 entries in the database
* `npm run weatherLogger`: Starts a cronjob that - while running - will retreive and log the weather data every 3 minutes 
* `npm start`: Launches a web server you can visit to view the last 100 weather data points

## Deploying at Kinsta
For a more visual description of the deployment process take a look at our [Example Deployment](https://kinsta.com/help/example-deployment/) Help Center article

1. Create a new database of your choice in MyKinsta
2. Create a new application and choose your cloned repository to deploy
3. In the Settings page of your application click on Add Connection and select your database. Make sure to check the "Add environment variables to access the database" box. This will create all the variables starting with `DB_` for you
4. Go to Settings -> Environment Variables for your application and set the appropriate environment variables from above.
5. At some point in this process your application deployment may have failed. This is expected behavior, it was likely caused by the environment variables not being added. If this happens a re-deploy will set things right
6. Visit your deployment URL to confirm everything is working, you should see the text "Waiting for weather data"
7. In the Processes section in MyKinsta click "Create a new process". Add a descriptive name (eg.: Weather logging cronjon) and use `npm run weatherLogger` as the start command
8. In a couple of minutes (depending on what you set as the `FREQUENCY` value) you should see weather data in a table when visiting the deployment URL
