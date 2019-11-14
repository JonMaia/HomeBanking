const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost/homebankingdb';

function connect() {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage()
                .then(() => {
                    mongoose.connect(DB_URI,
                        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
                        .then((res, err) => {
                            if (err) return reject(err);
                            resolve();
                        });
                });
        } else {
            mongoose.connect(DB_URI,
                { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
                .then((res, err) => {
                    if (err) return reject(err);
                    resolve();
                });
        }    
    });
}

function close() {
    mongoose.connection.db.dropDatabase();
    return mongoose.disconnect();
}

module.exports = { connect, close };