var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let db = null;

module.exports = app => {
    var url = {
        'test':'mongodb://localhost/cp_test',
        'development':'mongodb://localhost/cp',
        'production': ''
    }
    if (!db) {
        var options = {
            useMongoClient: true
        }
        db = mongoose.connect(url[process.env.NODE_ENV || 'development'], options);
        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            if (url[process.env.NODE_ENV] !== url.test) {
                console.log("Connection DB ok!");
            }
        });
    }
    return db;
};