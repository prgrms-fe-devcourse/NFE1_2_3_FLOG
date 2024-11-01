import React, { useState, useEffect } from "react";
import styled from "styled-components";
import usePostCreateStore from "./PostCreateStore";
import { useDraftPostStore } from "./PostCreateStore";

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
  outline: none;
`;

const PostCreateTitle = () => {
  const { data, setData } = usePostCreateStore();
  const { isDraftedPost } = useDraftPostStore();
  const [title, setTitle] = useState(data.title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setData({ title: e.target.value });
  };

  useEffect(() => {
    if (isDraftedPost) {
      setTitle(data.title); // 드래프트 상태일 때 제목 설정
    }
  }, [isDraftedPost, data.title]);

  useEffect(() => {
    setTitle(data.title); // data.title이 변경될 때마다 업데이트
  }, [data.title]);

  return <InputTitle placeholder="제목을 입력해주세요" value={title} onChange={handleChange} />;
};

export default PostCreateTitle;
