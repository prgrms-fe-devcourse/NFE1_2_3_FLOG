import { Post, IPost } from "../models/postModel";

//특정 포스트 조회
export const getPostById = async (postId: string): Promise<IPost | null> => {
  return await Post.findById(postId).populate("authorId"); //populate메서드를 사ㅇㅛㅇ하면 authorId에 저장된 ID를 기반으로 관련된 User문서의 전체 정보를 조회할 수 있음
};
