import express from "express"
import passport from 'passport'
import cors from 'cors'
import dotenv from 'dotenv'
import RecipeService from '../services/recipeService.js'
dotenv.config()
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
app.get('/', cors(corsOptions), passport.authenticate('jwt', {session: false}), (req, res) => {
    RecipeService().getRecipes(req, res)
});

app.get('/:id', cors(corsOptions), passport.authenticate('jwt', {session: false}), (req, res) => {
    RecipeService().getRecipeById(req, res)
});
app.delete('/:id', cors(corsOptions), passport.authenticate('jwt', {session: false}), (req, res) => {
    RecipeService().delete(req, res)
});

app.post(['/', '/new'], cors(corsOptions), 
passport.authenticate('jwt', {session: false}), 
(req, res) => {
    RecipeService().create(req, res)
});

app.post('/:id', cors(corsOptions), passport.authenticate('jwt', {session: false}), (req, res) => {
    // console.log(req.headers);
    RecipeService().update(req, res)
});

export default app
