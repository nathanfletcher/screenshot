'use strict';

const {screenshot} = require('./screenshot.js')

const express = require('express');
const puppeteer = require('puppeteer');
var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('files'))
app.use(screenshot);


const server = app.listen(process.env.PORT || 8080, err => {
    if (err) return console.error(err);
    const port = server.address().port;
    console.info(`App listening on port ${port}`);
  });

module.exports = app;