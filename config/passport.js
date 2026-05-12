// import 'dotenv/config';
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import prisma from "../lib/prisma.js";

export default function configurePassport(passport) {
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET,
            },
            async (payload, done) => {
                try {
                    const user = await prisma.users.findById(payload.sub);

                    if (!user) return done(null, false);

                    done(null, user);
                } catch (err) {
                    done(err, false);
                }
            }
        )
    );
}
