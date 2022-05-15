import {Strategy, ExtractJwt} from "passport-jwt";
import db from '../models/index.js'
const applyPassport = (passport, _secretOrKey) => {
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // header에 bearer스키마에 담겨온 토큰 해석할 것
        secretOrKey: _secretOrKey
    };
    const verifyUser = async (jwt_payload, done) => {
        // console.log(jwt_payload)
        const user = await db
            .User
            .findById(jwt_payload).exec();
        done(null, user);
    }
    passport.use(new Strategy(jwtOptions, verifyUser));
    return passport;
}
export default applyPassport