# Sozialkompass

## General
The Sozialkompass (German compund from the words "Sozial" meaning social and "Kompass" meaning compass) is a project that aims to inform people living in Germany about possible benefit entitlements they have. 
This is done in a questionaire, no unlike the "[Wahl-O-Mat](https://www.wahl-o-mat.de/nordrheinwestfalen2022/app/main_app.html)" or similar products. The questionaire is dynamically created and tries to inform our users as fast as possible.

## Installation
The Sozialkompass can be deployed with the included docker-compose file. In the terminal simply navigate to the Sozialkompass root folder and run `docker compose up -d`. This installs our Database MongoDB and the Frontend written in React. 
To fill the Database you need to create applications, corresponding attributes and the government offices that handle these applications. Examples for all these files and how they should be formatted can be found in `/backend/Algorithmus/assets`. Once this data is stored in the database you need to set up an .env file which contains the credentails to your database in the `/backend` folder. This file should look like this:
```
MONGO_DB_ADDRESS=mongodb://localhost:27017
MONGO_DB_USER=root
MONGO_DB_PASSWORD=goodPW
```
Now you can run the algorithm which creates the treenodes. Simply run the main.py file in `backend/Algorithmus`. The treenodes are automatically created and stored in the database. Any old treenodes will be deleted from the database.

## Future
In the future we plan on creating a admin-panel which should make the population of the Database with information much more comfortable. Besides this work on the algorithm will continue. We plan on allowing more answer types while also making the question-selection-algorithm more robust. 
Furthermore a lot of design work still needs to be done.

## About us
This project is run for a project seminar by students of the [WWU Münster](https://www.uni-muenster.de/de/). It was first started at the [MÜNSTERHACK 2022](https://www.muensterhack.de/), where it won the mentor price and the second place. It was also accepted in their Solution Enabler Program. Until March 2023 we will also update our [blog](https://sozialkompass.uni-muenster.de/) (in german) where you can learn more about our team and our way of working.
