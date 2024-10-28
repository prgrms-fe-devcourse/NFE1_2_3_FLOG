import React from "react";
import styled from "styled-components";
import usePostCreateStore from "./PostCreateStore";

const black = "#212529";
const gray = "#7D7D7D";

const InputTitle = styled.input`
  width: 1000px;
  height: 50px;
  font-size: 32px;
  color: ${black};
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid ${gray};
  border-width: 0 0 1px;
`;

const PostCreateTitle = () => {
  const { data, setData } = usePostCreateStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ title: e.target.value });
  };

  return (
    <InputTitle placeholder="제목을 입력해주세요" value={data.title} onChange={handleChange} />
  );
};

export default PostCreateTitle;
