
import { Router, Response } from "express";
import authenticate, {
    AuthenticatedRequest,
} from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const router = Router();

// Students, instructors, and admins
router.get(
    "/student",
    authenticate,
    authorize("student", "instructor", "admin"),
    (_req: AuthenticatedRequest, res: Response) => {
        res.json({
            success: true,
            message: "Student route accessed successfully",
        });
    }
);

// Instructors and admins only
router.get(
    "/instructor",
    authenticate,
    authorize("instructor", "admin"),
    (_req: AuthenticatedRequest, res: Response) => {
        res.json({
            success: true,
            message: "Instructor route accessed successfully",
        });
    }
);

// Admins only
router.get(
    "/admin",
    authenticate,
    authorize("admin"),
    (_req: AuthenticatedRequest, res: Response) => {
        res.json({
            success: true,
            message: "Admin route accessed successfully",
        });
    }
);

export default router;
