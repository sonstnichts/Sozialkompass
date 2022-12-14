# Sozialkompass

## General
The Sozialkompass (German compund from the words "Sozial" meaning social and "Kompass" meaning compass) is a project that aims to inform people living in Germany about possible benefit entitlements they have. 
This is done in a questionaire, not unlike the "[Wahl-O-Mat](https://www.wahl-o-mat.de/nordrheinwestfalen2022/app/main_app.html)" or similar products. The questionaire is dynamically created and tries to inform our users as fast as possible.

## Installation
The Sozialkompass can be deployed with the included docker-compose file. In the terminal simply navigate to the Sozialkompass root folder and run `docker compose up`. This installs our Database MongoDB, the Frontend written in React and our api written in Flask. 
At first deployment it will create a Docker volume and runs the algorithm with a small set of data contained in this repository.

## Future
In the future we plan on creating an admin-panel which should make the population of the database with information much more comfortable. Besides this work on the algorithm will continue. We plan on allowing more answer types while also making the question-selection-algorithm more robust. 
Furthermore a lot of design work still needs to be done.

## About us
This project is run for a project seminar by students of the [WWU Münster](https://www.uni-muenster.de/de/). It was first started at the [MÜNSTERHACK 2022](https://www.muensterhack.de/), where it won the mentor price and the second place. It was also accepted in their Solution Enabler Program. Until March 2023 we will also update our [blog](https://sozialkompass.uni-muenster.de/) (in german) where you can learn more about our team and our way of working.
