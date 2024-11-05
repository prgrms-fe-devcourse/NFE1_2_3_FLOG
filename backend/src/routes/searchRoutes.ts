import { Router } from "express";
import { getTrendingSearches, searchPosts, searchCurations } from "../controllers/searchController";

const router = Router();

router.get('/search/posts', searchPosts);
router.get('/search/curations', searchCurations);
router.get('/search/trending', getTrendingSearches);

export default router;