import applyDotenv from './applyDotenv.js'
import dotenv from 'dotenv'
import {MongoClient} from 'mongodb'
const getDatabase = () => {
    const {mongoUri} = applyDotenv(dotenv)
    const client = new MongoClient(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    let dbConnect = null
    return {
        acceptDb(callback) {
            client.connect((err, db) => {
                if (err || !db) {
                    return callback(err)
                }
                dbConnect = db.db('soccerdb');
                console.log(dbConnect);
                console.log(dbConnect.connection);
                console.log('DB 구성에서 몽고DB에 접속하다')
                return callback()
            })
        },
        getDb() {
            return dbConnect
        }

    }
}
export default getDatabase
