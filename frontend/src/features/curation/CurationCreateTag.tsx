import React, { useState, useCallback, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import closeIcon from "../../../shared/assets/curation-create-icons/closeIcon.png";
import useCurationCreateStore from "./CurationCreateStore";

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

const CurationCreateTag: React.FC = () => {
  const { data, setData } = useCurationCreateStore();
  const [inputTag, setInputTag] = useState<string>("");

  const tagList = data.tags;

  const addTag = useCallback(
    (tag: string) => {
      if (
        tag &&
        tag.length <= 8 &&
        tagList.length < 5 &&
        !tagList.some((existingTag) => existingTag.includes(tag))
      ) {
        setData({ tags: [...tagList, tag] });
      }
    },
    [tagList, setData]
  );

  const onKeyDownInput = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        addTag(inputTag.trim());
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
      setData({ tags: tagList.filter((tag) => tag !== tagToRemove) });
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
            {/* <CloseIcon src={closeIcon} /> */}
          </Tag>
        ))}
      </TagList>
    </TagBox>
  );
};

export default React.memo(CurationCreateTag);
