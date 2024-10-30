import { Request, Response } from "express";
import { getPostById, getPostListService } from "../services/postService";
import { Types } from "mongoose";
import User from "../models/userModel";

// 포스트 리스트 조회
export const getPostList = async (req: Request, res: Response): Promise<void> => {
  const postType = req.query.postType as string | undefined;

  try {
    const postList = await getPostListService(postType);
    res.status(200).json({ success: true, postList })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "포스트 리스트를 불러오는 중 오류가 발생하였습니다.",
      err
    })
  }
}

//특정 포스트 조회
export const getPost = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params; //요청 파라미터에서 포스트 id가져옴
  try {
    const post = await getPostById(postId);
    if (!post) {
      res
        .status(404)
        .json({ success: false, message: "포스트를 찾을 수 없습니다." });
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
  //좋아요 담는 배열이 objectId 타입이라서 바꿔줌
  const userObjectId = new Types.ObjectId(userId);

  if (!userId) {
    res
      .status(401)
      .json({ success: false, message: "사용자가 인증되지 않았습니다." });
    return;
  }

  try {
    const post = await getPostById(postId);
    if (!post) {
      res
        .status(404)
        .json({ success: false, message: "포스트를 찾을 수 없습니다." });
      return;
    }

    const likeIndex = post.likes.indexOf(userObjectId);

    if (likeIndex === -1) {
      post.likes.push(userObjectId);
      await post.save();
      res
        .status(200)
        .json({ success: true, message: "좋아요가 추가되었습니다." });
    } else {
      post.likes.splice(likeIndex, 1);
      await post.save();
      res
        .status(200)
        .json({ success: true, message: "좋아요가 취소되었습니다." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "좋아요 토글 중 오류가 발생했습니다." });
  }
};

// 포스트 북마크 추가/삭제 API
export const Bookmark = async (req: Request, res: Response) => {
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
      user.bookmarkedPosts = user.bookmarkedPosts.filter(
        (id) => id.toString() !== postId
      );
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
    res
      .status(500)
      .json({ error: "서버 오류가 발생했습니다. 다시 시도해주세요." });
  }
};
