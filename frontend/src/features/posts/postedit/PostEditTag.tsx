import React, { useState, useCallback, ChangeEvent, KeyboardEvent, useEffect } from "react";
import styled from "styled-components";
import usePostEditStore from "./usePostEditStore";

const pink = "#F9F4F4";

const TagBox = styled.div`
  display: flex;
`;

const InputTag = styled.input`
  display: flex;
  width: 300px;
  height: 100%;
  border-width: 0;
  border-radius: 10px;
  outline: none;
`;

const TagList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Tag = styled.div`
  display: flex;
  min-width: 80px;
  height: 30px;
  text-align: center;
  background-color: ${pink};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
`;

const CloseIcon = styled.img`
  width: 12px;
  cursor: pointer;
`;

const PostCreateTag: React.FC = () => {
  const { data, setData } = usePostEditStore();
  const [inputTag, setInputTag] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>(data.tags); // Local state for tags

  useEffect(() => {
    setTagList(data.tags);
  }, [data.tags]);

  const addTag = useCallback(
    (tag: string) => {
      if (
        tag &&
        tag.length <= 8 && // 8자 이하 체크
        tagList.length < 5 && // 태그 개수 5개 이하 체크
        !tagList.some((existingTag) => existingTag.includes(tag))
      ) {
        setData({ tags: [...tagList, tag] }); // Zustand 스토어 업데이트
      }
    },
    [tagList, setData]
  );

  const onKeyDownInput = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); // Spacebar 기본 동작 방지
        addTag(inputTag.trim()); // 공백 제거 후 태그 추가
        setInputTag("");
      }
    },
    [inputTag, addTag]
  );

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value);
  }, []);

  const removeTag = useCallback(
    (tagToRemove: string) => {
      setData({ tags: tagList.filter((tag) => tag !== tagToRemove) }); // Zustand 스토어 업데이트
    },
    [tagList, setData]
  );

  return (
    <TagBox>
      <InputTag placeholder="태그를 작성해주세요" onChange={onChangeInput} onKeyDown={onKeyDownInput} value={inputTag} />
      <TagList>
        {tagList.map((tag, i) => (
          <Tag key={i} onClick={() => removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </TagList>
    </TagBox>
  );
};

export default PostCreateTag;
