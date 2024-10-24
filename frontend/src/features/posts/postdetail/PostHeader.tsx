import styled from "styled-components";

const PostHeader = () => {
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
    margin: 0px;
  `;
  const PostInfoBox = styled.p`
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

  return (
    <div>
      <CategoryBox>
        <Category>카테고리</Category>
        <Category>카테고리</Category>
        <Category>카테고리</Category>
        <Category>카테고리</Category>
        <Category>카테고리</Category>
        <Category>카테고리</Category>
      </CategoryBox>
      <Title>포스트 상세 페이지 제목 타이틀 뭐시깽이</Title>
      <PostInfoBox>
        <div>
          <PostInfo>닉넴이지롱</PostInfo>
          <PostInfo>2024.10.22</PostInfo>
        </div>
        <div>
          <Button>수정</Button>
          <Button>삭제</Button>
        </div>
      </PostInfoBox>
    </div>
  );
};

export default PostHeader;
