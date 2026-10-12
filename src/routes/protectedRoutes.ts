
import { Router, Response } from "express";
import authenticate, {
    AuthenticatedRequest,
} from "../middleware/authenticate";

const router = Router();

router.get("/profile", authenticate, (req, res) => {
    const authUser = (req as AuthenticatedRequest).authUser;

    res.status(200).json({
        success: true,
        message: "You accessed a protected route",
        user: authUser,
    });
});

export default router;
