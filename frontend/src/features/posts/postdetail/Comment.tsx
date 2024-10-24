import styled from "styled-components";
import testImg from "../../../../public/testImg.png";
import heartIcon from "../../../../public/heart.svg";

const Comment = () => {
  const Hr = styled.hr`
    border: none;
    height: 0.1px;
    background: #cccccc;
  `;
  const Button = styled.button`
    color: #7d7d7d;
    font-size: 14px;
    border: none;
    background: none;
    cursor: pointer;
  `;
  const ImageBox = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 23px;
  `;
  const CommentInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;
  const CommentInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
    font-color: #212529;
    font-size: 14px;
  `;
  const BestBox = styled.p`
    display: inline-block;
    height: 18px;
    padding: 3px 10px;
    border-radius: 10px;
    color: #ffffff;
    background-color: #ff2c2c;
    font-size: 12px;
    margin: 0px;
  `;
  const CommentBox = styled.p`
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 0px 50px;
    margin: 0px;
  `;
  const Comment = styled.p`
    font-color: #212529;
    font-size: 14px;
    margin: 0px;
  `;
  const ReactionBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 0px;
    justify-content: space-between;
    align-items: center;
    color: #7d7d7d;
    font-size: 14px;
  `;

  const ReactionItem = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    color: #7d7d7d;
    font-size: 14px;
  `;

  return (
    <div>
      <div>
        <CommentInfoBox>
          <CommentInfo>
            <ImageBox src={testImg} alt={testImg}></ImageBox>
            <p>랭킹</p>
            <p>닉넴머하지</p>
            <BestBox>BEST</BestBox>
            <p style={{ color: "#7d7d7d" }}>1시간 전</p>
          </CommentInfo>
          <div>
            <Button>
              <Comment>수정</Comment>
            </Button>
            <Button>
              <Comment>삭제</Comment>
            </Button>
          </div>
        </CommentInfoBox>
      </div>
      <CommentBox>
        <Comment>
          댓글 내용입니다 댓글내용입니다 댓글내용입니다
          댓글내용입니다댓글내용입니다 댓글내용입니다 댓글내용입니다
          댓글내용입니다댓글내용입니다 댓글내용입니다 댓글내용입니다
          댓글내용입니다 댓글내용입니다
        </Comment>
      </CommentBox>
      <ReactionBox>
        <p>답글 달기</p>
        <ReactionItem>
          <img src={heartIcon} alt="heartIcon"></img>
          <p>33개</p>
        </ReactionItem>
      </ReactionBox>
      <Hr />
    </div>
  );
};
export default Comment;
