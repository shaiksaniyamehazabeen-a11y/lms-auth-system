
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./passport/localStrategy";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import roleRoutes from "./routes/roleRoutes";
const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "development-session-secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/roles", roleRoutes);
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "LMS Authentication API is running",
    });
});
export default app;
