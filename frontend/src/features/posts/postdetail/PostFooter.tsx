import styled from "styled-components";
import { useState } from "react";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0px;
  margin: 0px;
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const Tag = styled.button`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  color: #7d7d7d;
  background-color: #f9f4f4;
  font-size: 14px;
  margin: 0px;
  cursor: pointer;
  border: none;
`;
const ReactionBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  padding-border: 20px;
`;
const ReactionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  color: #7d7d7d;
  font-size: 14px;
`;

const PostFooter = () => {
  const commentIcon = "/comment.svg";
  const heartIcon = "/heart.svg";
  const heartFilledIcon = "/heartFilled.svg";

  const [isLike, setIsLike] = useState(false);
  const clickLike = () => {
    setIsLike((prev) => !prev);
  };

  return (
    <Box>
      <TagBox>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
        <Tag>태그임</Tag>
      </TagBox>
      <ReactionBox>
        <ReactionItem>
          <Button onClick={clickLike} style={{ width: "20px", height: "20px" }}>
            {isLike ? (
              <img src={heartFilledIcon} alt="heartFilledIcon"></img>
            ) : (
              <img src={heartIcon} alt="heartIcon"></img>
            )}
          </Button>
          <p>33개</p>
        </ReactionItem>
        <ReactionItem>
          <img src={commentIcon} alt="commentIcon"></img>
          <p>12개</p>
        </ReactionItem>
      </ReactionBox>
    </Box>
  );
};
export default PostFooter;
