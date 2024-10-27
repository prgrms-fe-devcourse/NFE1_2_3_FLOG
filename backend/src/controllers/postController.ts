import { Request, Response } from "express";
import { getPostById } from "../services/postService";
import { Types } from "mongoose"; // Types를 임포트
import User from "../models/userModel";

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

  console.log("User ID:", userId); // User ID를 콘솔에 출력

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

    // 사용자가 이미 좋아요를 눌렀는지 확인
    const likeIndex = post.likes.indexOf(userObjectId);

    if (likeIndex === -1) {
      // 좋아요 추가
      post.likes.push(userObjectId);
      await post.save(); // 변경 사항 저장
      res
        .status(200)
        .json({ success: true, message: "좋아요가 추가되었습니다." });
    } else {
      // 좋아요 취소
      post.likes.splice(likeIndex, 1); // 배열에서 사용자 ID 제거
      await post.save(); // 변경 사항 저장
      res
        .status(200)
        .json({ success: true, message: "좋아요가 취소되었습니다." });
    }
  } catch (error) {
    console.error(error); // 오류 로그 출력
    res
      .status(500)
      .json({ success: false, message: "좋아요 토글 중 오류가 발생했습니다." });
  }
};

// 포스트 북마크 추가/삭제 API
export const Bookmark = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const userId = req.user?._id; // JWT에서 추출한 사용자 ID
  const postObjectId = new Types.ObjectId(postId);
  try {
    // 유저와 포스트 찾기
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
