require('dotenv').config();
const express = require('express');
const dbConnection = require("./db");
const middleware = require("./middleware");
const controllers = require('./controllers');
const app = express();

app.use(express.json());
app.use(middleware.headers);

app.use('/user', controllers.userController);

app.use(middleware.validateJWT);
app.use('/log', controllers.logController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    })