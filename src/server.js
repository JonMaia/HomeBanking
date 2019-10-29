const app = require('./index');
const db = require('./db_index');

const PORT = process.env.PORT || 3011;

db.connect()
    .then(() => {
        console.log('DB is Connected');
        app.listen(PORT, () => {
            console.log('Listening on port: ' + PORT);
        });
    });