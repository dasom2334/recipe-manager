import db from '../app/models/index.js';
db.mongoose.Promise = global.Promise;
db
    .mongoose
    .connect(process.env.MONGO_TEST_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('TEST DB Connected.')
    })
    .catch(err => {
        console.log('TEST DB Connect fail.', err)
    });

export default db;