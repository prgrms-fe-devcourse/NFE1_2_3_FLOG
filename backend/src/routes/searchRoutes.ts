import { Router } from "express";
import { getTrendingSearches, searchPosts } from "../controllers/searchController";

const router = Router();

router.get('/search/posts', searchPosts);
router.get('/search/trending', getTrendingSearches);

export default router;