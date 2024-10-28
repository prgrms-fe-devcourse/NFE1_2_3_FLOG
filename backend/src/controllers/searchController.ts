import { Request, Response } from "express";
import { Post } from "../models/postModel";
import { SearchLog } from "../models/searchlogModel";

export const searchPosts = async (req: Request, res: Response) => {
  const { query, gender, age, style } = req.query;

  // 검색어는 쿼리 옵션은 대소문자 구문없이 (맞나...?)
  const searchConditions: any = {
    title: { $regex: query, $options: "i" }
  }

  // 키워드 걸기
  if (gender && gender !== '전체') {
    searchConditions.genderFilter = gender
  }

  if (age && age !== '전체') {
    searchConditions.ageFilter = age
  }

  if (style && style !== '전체') {
    searchConditions.styleFilter = style
  }

  try {
    // 쿼리값으로 대조하여 검색어 기록남기기
    if (query) {
      const existingLog = await SearchLog.findOne({ query });
      if(existingLog) {
        existingLog.searchCount += 1;
        await existingLog.save();
      } else {
        const newLog = new SearchLog({ query, searchCount: 1, createdAt: Date.now})
        await newLog.save();
      }
    }

    const posts = await Post.find(searchConditions).populate("authorId", "nickname profileImage")
    res.status(200).json({ posts })
  } catch (err) {
    res.status(500).json({ message: "서버 오류 발생", err })
  }
}

export const getTrendingSearches = async (req: Request, res: Response) => {
  try {
    const trendingSearches = await SearchLog.find().sort({ searchCount: -1 }).limit(5);
    res.status(200).json({ trendingSearches });
  } catch (err) {
    res.status(500).json({ message: "서버 오류 발생", err })
  }
}