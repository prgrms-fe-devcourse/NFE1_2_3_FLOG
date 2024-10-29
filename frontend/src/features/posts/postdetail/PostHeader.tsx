import styled from "styled-components";
import { useState } from "react";
import useStore from "../../../app/store";
import Modal from "../../../shared/components/Modal";
import { formatDate } from "../../../shared/utils/formatDate";

const CategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const Category = styled.p`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  color: #7d7d7d;
  background-color: #f9f4f4;
  font-size: 14px;
  margin: 0px;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: #212529;
  margin-block: 20px;
`;
const PostInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px;
`;
const PostInfo = styled.p`
  display: inline-block;
  color: #7d7d7d;
  font-size: 14px;
  margin: 5px;
`;
const Button = styled.button`
  color: #7d7d7d;
  font-size: 14px;
  border: none;
  background: none;
  cursor: pointer;
`;
const P = styled.p`
  margin: 5px;
`;
const ModalBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

interface PostHeaderProps {
  isUser: boolean;
  title: string;
  author: string;
  date: string;
  categories: string[];
}

const PostHeader = ({
  isUser,
  title,
  author,
  date,
  categories,
}: PostHeaderProps) => {
  const { isModalOpen, openModal, closeModal } = useStore();

  const starIcon = "/star.svg";
  const starFilledIcon = "/starFilled.svg";
  const formatedDate = formatDate(date);

  //게시물이 본인인지 아닌지 확인
  //이거 댓글도 수정 삭제 있어서 로직 뺄 수 있으면 공통으로 빼기
  const isAuthor = isUser;

  //지금은 팔로우 하지 않은 걸 초기로 넣었지만 나중에 팔로워 했는지 안 했는지 가져와서 넣어야함
  const [isFollow, setIsFollow] = useState(false);
  const clickFollow = () => {
    setIsFollow((prev) => !prev);
  };
  //북마크도 마찬가지
  const [isBookMark, setIsBookMark] = useState(false);
  const clickBookMark = () => {
    setIsBookMark((prev) => !prev);
  };

  return (
    <div>
      <CategoryBox>
        {categories.map((category, index) => (
          <Category key={index}>{category}</Category>
        ))}
      </CategoryBox>
      <div>
        <Title>{title}</Title>
      </div>
      <PostInfoBox>
        <div>
          <PostInfo>{author}</PostInfo>
          <PostInfo>{formatedDate}</PostInfo>
        </div>
        {isAuthor ? (
          <div>
            <Button>
              <P>수정</P>
            </Button>
            <Button onClick={openModal}>
              <P>삭제</P>
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button onClick={clickFollow}>
              {isFollow ? <P>팔로잉</P> : <P>팔로우</P>}
            </Button>
            <Button
              style={{ display: "flex", alignItems: "center", height: "28px" }}
              onClick={clickBookMark}
            >
              {isBookMark ? (
                <img src={starFilledIcon} alt="starFilledIcon"></img>
              ) : (
                <img src={starIcon} alt="starIcon"></img>
              )}
            </Button>
          </div>
        )}
      </PostInfoBox>
      {/* 모달 컴포넌트*/}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ModalBox>
            <h3>정말 삭제하시겠습니까?</h3>
          </ModalBox>
          <ModalBox>
            <Button onClick={closeModal}>취소</Button>
            <Button
              onClick={() => {
                // 여기에서 삭제 로직 추가
                closeModal();
              }}
            >
              삭제
            </Button>
          </ModalBox>
        </Modal>
      )}
    </div>
  );
};

export default PostHeader;
