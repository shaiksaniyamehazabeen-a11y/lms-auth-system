
import { Router } from "express";
import { register } from "../controllers/authController";
import { login } from "../controllers/loginController";
import passport from "passport";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post(
    "/session-login",
    passport.authenticate("local", {
        failureMessage: true,
    }),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Session login successful",
            user: req.user,
        });
    }
);

router.post("/logout", (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }

        req.session.destroy((sessionError) => {
            if (sessionError) {
                return next(sessionError);
            }

            res.clearCookie("connect.sid");

            return res.status(200).json({
                success: true,
                message: "Logged out successfully",
            });
        });
    });
});

export default router;
