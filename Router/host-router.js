const express = require('express');
const hostrouter =  express.Router();
const hostcontroller = require('../controller/host');

hostrouter.post("/submit-contact",hostcontroller.postUserQuery);
hostrouter.post("/booking-package",hostcontroller.postBookedPackage);

module.exports = hostrouter;

