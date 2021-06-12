const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
require("dotenv").config()
const connectDB = require('./config/db');
const tasks = require('./router/tasks');
const auth = require('./router/auth');
const path = require('path');


app.listen(port, () => console.log(`Server started to run on port ${port}.`));

app.use(express.json());

connectDB();

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE");
    next();
}

app.use(allowCrossDomain);

app.use('/tasks', tasks);
app.use('/auth', auth);

