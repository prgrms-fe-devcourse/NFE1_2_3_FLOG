import styled from "styled-components";
import commentIcon from "../../../../public/comment.svg";
import heartIcon from "../../../../public/heart.svg";

const PostFooter = () => {
  const TagBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  `;
  const Tag = styled.p`
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    color: #7d7d7d;
    background-color: #f9f4f4;
    font-size: 14px;
    margin: 0px;
  `;
  const ReactionBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
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
          <img src={heartIcon} alt="heartIcon"></img>
          <p>33개</p>
        </ReactionItem>
        <ReactionItem>
          <img src={commentIcon} alt="commentIcon"></img>
          <p>12개</p>
        </ReactionItem>
      </ReactionBox>
    </div>
  );
};
export default PostFooter;
