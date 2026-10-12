
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { findUserByEmail, findUserById } from "../models/User";

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await findUserByEmail(
                    email.trim().toLowerCase()
                );

                if (!user || !user.password) {
                    return done(null, false, {
                        message: "Invalid email or password",
                    });
                }

                const isMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isMatch) {
                    return done(null, false, {
                        message: "Invalid email or password",
                    });
                }

                return done(null, {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                });
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, (user as Express.User & { id: number }).id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await findUserById(id);

        if (!user) {
            return done(null, false);
        }

        return done(null, {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        return done(error);
    }
});
