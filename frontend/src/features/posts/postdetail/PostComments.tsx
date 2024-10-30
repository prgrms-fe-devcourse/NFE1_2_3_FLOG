import styled from "styled-components";
import sendIcon from "/send.svg";
import Comment from "./Comment";

const InputBox = styled.div`
  position: relative;
  width: 864px;
  height: 125px;
  border-radius: 20px;
  border: 1px solid #cccccc;
  margin: 10px auto;
`;

const Input = styled.textarea`
  position: flex;
  margin: 0 auto;
  width: 90%;
  height: 80%;
  border: none;
  line-height: 1.5;
  transform: translate(5%, 10%);
  resize: none;
  overflow: hidden;
  &:focus {
    outline: none;
    border: none;
  }
`;
const Button = styled.button`
  position: absolute;
  color: #7d7d7d;
  right: 10px;
  bottom: 0px;
  font-size: 14px;
  border: none;
  background: none;
  cursor: pointer;
`;

const PostComments = () => {
  return (
    <div>
      <p>댓글 작성하기</p>
      <InputBox>
        <Input placeholder="댓글을 입력하세요" maxLength={208}></Input>
        <Button>
          <img src={sendIcon} alt={sendIcon}></img>
        </Button>
      </InputBox>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};
export default PostComments;
