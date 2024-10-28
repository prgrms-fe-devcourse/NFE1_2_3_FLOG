import { Request, Response } from "express";
import { Post } from "../models/postModel";
import { SearchLog } from "../models/searchlogModel";

export const searchPosts = async (req: Request, res: Response) => {
  const { query } = req.query;
  try {
    const posts = await Post.find({ title: { $regex: query, $options: "i" } })
      .populate("authorId", "nickname profileImage")
    res.status(200).json({ posts })
  } catch (err) {
    res.status(500).json({ message: "서버 오류 발생", err })
  }
}

export const getTrendingSearches = async (req: Request, res: Response) => {
  try {
    const trendingSearches = await SearchLog.find().sort({ searchCount: -1 }).limit(10);
    res.status(200).json({ trendingSearches });
  } catch (err) {
    res.status(500).json({ message: "서버 오류 발생", err })
  }
}