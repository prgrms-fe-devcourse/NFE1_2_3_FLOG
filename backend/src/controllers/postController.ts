import { Request, Response } from "express";
import { getPostById, getPostListService, getRecommendPostListService } from "../services/postService";
import { Types } from "mongoose";
import User from "../models/userModel";

// 추천 포스트 리스트 조회
export const getRecommendPostList = async (req: Request, res: Response) => {
  try {
    // 일주일 이내의 게시물 리스트
    const originalPostList = await getRecommendPostListService();
    // 를 좋아요 순으로 솔트한 게시물 리스트
    const sortedPostList = originalPostList.sort((a, b) => {
      return b.likes.length - a.likes.length
    })
    // 를 3개만 잘라서 보냅니다.
    const slicedPostList = sortedPostList.slice(0, 3)

    res.status(200).json({ success: true, postList: slicedPostList })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "추천 포스트 리스트를 불러오는 중 오류가 발생하였습니다",
      err
    })
  }
}

// 포스트 리스트 조회
export const getPostList = async (req: Request, res: Response): Promise<void> => {
  const postType = req.query.postType as string | undefined;

  try {
    const postList = await getPostListService(postType);
    res.status(200).json({ success: true, postList });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "포스트 리스트를 불러오는 중 오류가 발생하였습니다.",
      err,
    });
  }
};

//특정 포스트 조회
export const getPost = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params; // 요청 파라미터에서 포스트 id가져옴
  try {
    const post = await getPostById(postId);
    if (!post) {
      res.status(404).json({ success: false, message: "포스트를 찾을 수 없습니다." });
      return;
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "포스트를 불러오는 중 오류가 발생했습니다.",
    });
  }
};

// 포스트 좋아요
export const Like = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params;

  // userId를 가져옴
  const userId = req.user?._id;
  // 좋아요 담는 배열이 objectId 타입이라서 바꿔줌
  const userObjectId = new Types.ObjectId(userId);

  if (!userId) {
    res.status(401).json({ success: false, message: "사용자가 인증되지 않았습니다." });
    return;
  }

  try {
    const post = await getPostById(postId);
    if (!post) {
      res.status(404).json({ success: false, message: "포스트를 찾을 수 없습니다." });
      return;
    }

    const likeIndex = post.likes.indexOf(userObjectId);

    if (likeIndex === -1) {
      post.likes.push(userObjectId);
      await post.save();
      res.status(200).json({ success: true, message: "좋아요가 추가되었습니다." });
    } else {
      post.likes.splice(likeIndex, 1);
      await post.save();
      res.status(200).json({ success: true, message: "좋아요가 취소되었습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "좋아요 토글 중 오류가 발생했습니다." });
  }
};

// 포스트 북마크 추가/삭제 API
export const Bookmark = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.postId;
  const userId = req.user?._id;
  const postObjectId = new Types.ObjectId(postId);
  try {
    const user = await User.findById(userId);
    const post = await getPostById(postId);

    if (!user) {
      res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      return;
    }

    if (!post) {
      res.status(404).json({ error: "해당 포스트를 찾을 수 없습니다." });
      return;
    }

    // bookmarkedPosts가 undefined일 경우 빈 배열로 초기화
    if (!user.bookmarkedPosts) {
      user.bookmarkedPosts = [];
    }

    // 북마크 추가 또는 삭제
    const isBookmarked = user.bookmarkedPosts.includes(postObjectId);

    if (isBookmarked) {
      // 북마크 삭제
      user.bookmarkedPosts = user.bookmarkedPosts.filter((id) => id.toString() !== postId);
      await user.save();
      res.status(200).json({ message: "북마크가 성공적으로 삭제되었습니다." });
    } else {
      // 북마크 추가
      user.bookmarkedPosts.push(postObjectId);
      await user.save();
      res.status(200).json({ message: "북마크가 성공적으로 추가되었습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류가 발생했습니다. 다시 시도해주세요." });
  }
};

// 포스트 생성 API
import { Post, IPost } from "../models/postModel"; // Post 모델 임포트
import { IUser } from "../models/userModel"; // IUser 인터페이스 임포트
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, thumbnail, tags, postType, genderFilter, ageFilter, styleFilter } = req.body;

    if (!title || !content || content.length === 0) {
      res.status(400).json({ success: false, message: "제목과 내용을 모두 입력해야 합니다." });
      return;
    }

    const newPost: IPost = new Post({
      title,
      content,
      thumbnail,
      tags,
      authorId: (req.user as IUser)._id,
      postType,
      genderFilter,
      ageFilter,
      styleFilter,
      status: "published", // 기본값을 draft로 설정
    });

    await newPost.save();

    // User.posts에 새 포스트 ID 추가
    const user = await User.findById((req.user as IUser)._id);
    if (user) {
      if (!user.posts) {
        user.posts = [];
      }
      user.posts.push(new Types.ObjectId(newPost._id as string));
      await user.save();
    }

    res.status(201).json({ success: true, message: "포스트가 성공적으로 생성되었습니다.", post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "서버에서 오류가 발생했습니다." });
  }
};

// 포스트 수정 API
export const editPost = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params; // URL 파라미터에서 postId를 가져옴
  const { title, content, thumbnail, tags, postType, genderFilter, ageFilter, styleFilter } = req.body;

  if (!title || !content || content.length === 0) {
    res.status(400).json({ success: false, message: "제목과 내용을 모두 입력해야 합니다." });
    return;
  }

  try {
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      res.status(404).json({ success: false, message: "존재하지 않는 포스트입니다." });
      return;
    }

    if (existingPost.authorId.toString() !== (req.user as IUser)._id?.toString()) {
      res.status(403).json({ success: false, message: "포스트를 수정할 권한이 없습니다." });
      return;
    }

    // 포스트 업데이트
    existingPost.title = title;
    existingPost.content = content;
    existingPost.thumbnail = thumbnail || existingPost.thumbnail;
    existingPost.tags = tags || existingPost.tags;
    existingPost.updatedAt = new Date();
    existingPost.postType = postType;
    existingPost.genderFilter = genderFilter || existingPost.genderFilter;
    existingPost.ageFilter = ageFilter || existingPost.ageFilter;
    existingPost.styleFilter = styleFilter || existingPost.styleFilter;

    await existingPost.save();

    res.status(200).json({ success: true, message: "포스트가 성공적으로 수정되었습니다.", post: existingPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "서버에서 오류가 발생했습니다." });
  }
};

// 포스트 임시 저장 API
export const saveDraft = async (req: Request, res: Response): Promise<void> => {
  const { title, content, thumbnail, tags, postType, genderFilter, ageFilter, styleFilter } = req.body;

  if (!title || !content || content.length === 0) {
    res.status(400).json({ success: false, message: "제목과 내용을 모두 입력해야 합니다." });
    return;
  }

  try {
    const newPost: IPost = new Post({
      title,
      content,
      thumbnail,
      tags,
      authorId: (req.user as IUser)._id,
      postType,
      genderFilter,
      ageFilter,
      styleFilter,
      status: "draft", // 기본값을 draft로 설정
    });

    await newPost.save();
    // User.posts에 새 포스트 ID 추가
    const user = await User.findById((req.user as IUser)._id);
    if (user) {
      if (!user.posts) {
        user.posts = [];
      }
      user.posts.push(new Types.ObjectId(newPost._id as string));
      await user.save();
    }

    res.status(201).json({ success: true, message: "포스트가 성공적으로 생성되었습니다.", post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "서버에서 오류가 발생했습니다." });
  }
};

export const getDraftedPost = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ success: false, message: "사용자가 인증되지 않았습니다." });
    return;
  }

  try {
    const user = await User.findById(userId).populate<{ posts: IPost[] }>("posts");
    if (!user || !user.posts) {
      res.status(404).json({ success: false, message: "사용자를 찾을 수 없거나 포스트가 없습니다." });
      return;
    }

    const draftedPosts = user.posts.filter((post) => post.status === "draft");
    const mostRecentDraft = draftedPosts.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];

    res.status(200).json({ success: true, mostRecentDraft });
  } catch (error) {
    console.error("임시 저장된 포스트 요청 실패:", error); // 추가된 에러 로그
    res.status(500).json({ success: false, message: "서버 오류가 발생했습니다.", error: (error as Error).message });
  }
};
