import express from "express"
import cors from 'cors'
import passport from 'passport'
import UserService from '../services/userService.js'
const mongoUri = process.env.MONGO_URI
const port = process.env.PORT
const jwtSecret = process.env.JWT_SECERT
const origin = process.env.ORIGIN
const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}
const app = express()
app.use(cors());
app.use(function (_req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
app.post('/join', cors(corsOptions), (req, res) => {
    UserService().join(req, res);
})
app.post('/login', cors(corsOptions), (req, res) => {
    UserService().login(req, res);
})
import applyToken from '../lambdas/applyToken.js'
// import VerifyToken from '../route/VerifyToken.js'
app.get('/logout', 
passport.authenticate('jwt', {session: false}),
async (req, res, next) => {
    try {
    } catch (error) {
      console.error(error);
      next(error);
    }
    console.log('hihi')
    console.log(req.headers);
    console.log(req.header);
    console.log(applyToken(req.headers))
    // console.log(VerifyToken(res, res, next))
    // console.log(' logout 진입 ')
    UserService().logout(req, res);
});
export default app