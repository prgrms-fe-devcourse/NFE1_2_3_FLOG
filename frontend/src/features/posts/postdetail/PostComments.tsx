import styled from "styled-components";
import sendIcon from "../../../../public/send.svg";
import Comment from "./Comment";

const InputBox = styled.div`
  position: relative;
  width: 864px;
  height: 120px;
  border-radius: 20px;
  border: 1px solid #cccccc;
  margin: 10px auto;
`;

const Input = styled.input`
  position: flex;
  margin: 0 auto;
  width: 98%;
  height: 80%;
  border: none;
  border-radius: 20px;
`;
const Button = styled.button`
  position: absolute;
  color: #7d7d7d;
  right: 10px;
  bottom: -4px;
  font-size: 14px;
  border: none;
  background: none;
  cursor: pointer;
`;

const PostComments = () => {
  return (
    <div>
      <div>
        <p>댓글 작성하기</p>
        <InputBox>
          <Input></Input>
          <Button>
            <img src={sendIcon} alt={sendIcon}></img>
          </Button>
        </InputBox>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};
export default PostComments;
