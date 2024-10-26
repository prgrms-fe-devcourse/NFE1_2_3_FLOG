import { Router } from "express";
import { getPost } from "../controllers/postController";

const router = Router();

router.get("/posts/:postId", getPost);
//:postId는 URL파라미터

export default router;
