import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'
import morgan from 'morgan'
import db from './app/models/index.js'
// import api from "./app/routes/api.js"
// import basic from "./app/routes/basic.js"
import users from "./app/routes/users.js"
import index from "./app/routes/index.js"
import recipes from "./app/routes/recipes.js"
import getResponse from "./app/lambdas/getResponse.js"
import applyPassport from './app/lambdas/applyPassport.js'
import applyDotenv from './app/lambdas/applyDotenv.js'

async function startServer() {
    // console.log('hi')
    const app = express();
    const {mongoUri, port, jwtSecret} = applyDotenv(dotenv)
    app.use(express.static('public'));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    const _passport = applyPassport(passport, jwtSecret);
    app.use(_passport.initialize());
    app.use("/", index);
    // app.use("/api", api);
    // app.use("/basic", basic);
    app.use("/user", users);
    app.use("/recipe", recipes);
    app.use(morgan('dev'))
    db
        .mongoose
        .connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('DB Connected.')
        })
        .catch(err => {
            console.log('DB Connect fail.', err)
            process.exit();
        });

    app.all("*", function (_req, res) {
        return getResponse().notFoundResponse(res, "Page not found.");
    });

    app.use((err, _req, res) => {
        if (err.name == "UnauthorizedError") {
            return getResponse().unauthorizedResponse(res, err.message);
        }
    });

    app.listen(port, () => {
        console.log('Server Started.')
    })
}

startServer()