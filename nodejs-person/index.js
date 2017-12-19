import express from 'express';
import consign from 'consign';

const app = express();

consign({verbose: false})
    .include("db.js")
    .then("libs/config.js")
    .then("libs/middleware.js")
    .then("routes")
    .then("libs/boot.js")
    .then("libs/logger.js")
    .into(app);

    module.exports = app;