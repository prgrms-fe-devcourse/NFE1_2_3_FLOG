import { Request, Response } from "express";
import { Post } from "../models/postModel";
import { SearchLog } from "../models/searchlogModel";

export const searchPosts = async (req: Request, res: Response) => {
  const { query, gender, age, style, postType } = req.query;

  const searchConditions: any = {
    title: { $regex: query, $options: "i" },
    status: 'published'
  };

  if (gender && gender !== '전체') {
    const genderArray = Array.isArray(gender) ? gender : (gender as string).split(',');
    searchConditions.genderFilter = { $in: genderArray };
  }
  if (age && age !== '전체') {
    const ageArray = Array.isArray(age) ? age : (age as string).split(',');
    searchConditions.ageFilter = { $in: ageArray };
  }
  if (style && style !== '전체') {
    const styleArray = Array.isArray(style) ? style : (style as string).split(',');
    searchConditions.styleFilter = { $in: styleArray };
  }
  if (postType) {
    searchConditions.postType = postType;
  }

  try {
    // 쿼리값으로 대조하여 검색어 기록남기기
    if (query) {
      const existingLog = await SearchLog.findOne({ query });
      if (existingLog) {
        existingLog.searchCount += 1;
        await existingLog.save();
      } else {
        const newLog = new SearchLog({ query, searchCount: 1, createdAt: new Date() });
        await newLog.save();
      }
    }

    const posts = await Post.find(searchConditions)
      .populate("authorId", "nickname profileImage")
    
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: "서버 오류 발생", err });
  }
};

export const getTrendingSearches = async (req: Request, res: Response) => {
  try {
    const trendingSearches = await SearchLog.find().sort({ searchCount: -1 }).limit(5);
    res.status(200).json({ trendingSearches });
  } catch (err) {
    res.status(500).json({ message: "서버 오류 발생", err });
  }
};
