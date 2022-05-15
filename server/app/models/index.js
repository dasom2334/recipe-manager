import dotenv from 'dotenv'
import mongoose from 'mongoose'
import UserModel from './UserModel.js'
import RecipeModel from './RecipeModel.js'
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
// db.url = dotenv.MONGO_URI
db.User = new UserModel(mongoose)
db.Recipe = new RecipeModel(mongoose)
export default db