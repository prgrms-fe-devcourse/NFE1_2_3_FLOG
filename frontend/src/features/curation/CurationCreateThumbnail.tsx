import React, { useState } from "react";
import styled from "styled-components";
import useCurationCreateStore from "./CurationCreateStore";

const InputThumbnail = styled.input`
  width: 1000px;
  height: 40px;
  font-size: 16px;
  color: #212529;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  padding: 8px;
  outline: none;
`;

const CurationCreateThumbnail = () => {
  const { data, setData } = useCurationCreateStore();
  const [thumbnail, setThumbnail] = useState(data.thumbnail);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnail(e.target.value);
    setData({ thumbnail: e.target.value });
  };

  return (
    <InputThumbnail
      placeholder="썸네일 링크를 입력해주세요"
      value={thumbnail}
      onChange={handleChange}
    />
  );
};

export default CurationCreateThumbnail;
