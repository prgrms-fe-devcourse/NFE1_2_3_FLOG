import React, { useState } from "react";
import styled from "styled-components";
import Exit from "../../../shared/components/asset/Exit.svg";
import usePostCreateStore from "./PostCreateStore";

const black = "#212529";
const gray = "#7D7D7D";

const CategoryButton = styled.button`
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid ${gray};
  border-radius: 5px;
  cursor: pointer;
`;

const CategoryModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryModalInner = styled.div`
  width: 400px;
  padding: 25px 40px;
  position: relative;
  background-color: #fff;
  box-shadow: 2px 3px 20px #00000040;
  border-radius: 12px;
`;

const CategoryModalTitle = styled.p`
  font-size: 20px;
  color: #212529;
  text-align: center;
  margin-bottom: 45px;
`;

const CategoryModalExitButton = styled.img`
  position: absolute;
  top: 25px;
  right: 38px;
  cursor: pointer;
`;

const CategoryModalTagWrap = styled.div`
  margin-bottom: 30px;
`;

const CategoryModalTagTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 15px;
`;

const CategoryModalTagInner = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px 30px;
`;

interface CategoryButtonTypes {
  isClicked?: boolean;
}

const CategoryModalTagButton = styled.div<CategoryButtonTypes>`
  width: 84px;
  line-height: 31px;
  height: 31px;
  background-color: ${({ isClicked }) => (isClicked ? "slateblue" : "#edeaea")};
  border-radius: 10px;
  font-size: 14px;
  color: ${({ isClicked }) => (isClicked ? "#fff" : "#212529")};
  text-align: center;
  cursor: pointer;
`;

const CategoryComplete = styled.p`
  font-size: 14px;
  color: #212529;
  text-align: center;
  margin: 28px auto 0;
  cursor: pointer;
`;

const PostCreateCategory = () => {
  const [isModal, setIsModal] = useState(false);
  const [genderFilter] = useState(["전체", "남자", "여자"]);
  const [ageFilter] = useState(["전체", "10대 미만", "10대", "20대", "30대", "40대", "50대 이상"]);
  const [styleFilter] = useState(["전체", "캐쥬얼", "스트릿", "페미닌", "펑크", "스포트", "비즈니스"]);
  const { data, setData } = usePostCreateStore();

  const handleSelect = (type: "gender" | "age" | "style", value: string) => {
    if (type === "gender") {
      const newGenderFilter = data.genderFilter.includes(value)
        ? data.genderFilter.filter((g) => g !== value) // 이미 선택된 경우 제거
        : [...data.genderFilter, value]; // 선택되지 않은 경우 추가

      setData({ ...data, genderFilter: newGenderFilter });
    } else if (type === "age") {
      const newAgeFilter = data.ageFilter.includes(value) ? data.ageFilter.filter((a) => a !== value) : [...data.ageFilter, value];

      setData({ ...data, ageFilter: newAgeFilter });
    } else if (type === "style") {
      const newStyleFilter = data.styleFilter.includes(value) ? data.styleFilter.filter((s) => s !== value) : [...data.styleFilter, value];

      setData({ ...data, styleFilter: newStyleFilter });
    }
  };

  return (
    <div>
      <CategoryButton onClick={() => setIsModal(!isModal)}>카테고리</CategoryButton>
      {isModal && (
        <CategoryModalWrap>
          <CategoryModalInner>
            <CategoryModalTitle>카테고리</CategoryModalTitle>
            <CategoryModalExitButton src={Exit} onClick={() => setIsModal(!isModal)} alt="모달 상단 닫기 버튼" />

            <CategoryModalTagWrap>
              <CategoryModalTagTitle>성별</CategoryModalTagTitle>
              <CategoryModalTagInner>
                {genderFilter.map((gender, index) => (
                  <CategoryModalTagButton key={index} isClicked={data.genderFilter.includes(gender)} onClick={() => handleSelect("gender", gender)}>
                    {gender}
                  </CategoryModalTagButton>
                ))}
              </CategoryModalTagInner>
            </CategoryModalTagWrap>

            <CategoryModalTagWrap>
              <CategoryModalTagTitle>나이</CategoryModalTagTitle>
              <CategoryModalTagInner>
                {ageFilter.map((age, index) => (
                  <CategoryModalTagButton key={index} isClicked={data.ageFilter.includes(age)} onClick={() => handleSelect("age", age)}>
                    {age}
                  </CategoryModalTagButton>
                ))}
              </CategoryModalTagInner>
            </CategoryModalTagWrap>

            <CategoryModalTagWrap>
              <CategoryModalTagTitle>스타일</CategoryModalTagTitle>
              <CategoryModalTagInner>
                {styleFilter.map((style, index) => (
                  <CategoryModalTagButton key={index} isClicked={data.styleFilter.includes(style)} onClick={() => handleSelect("style", style)}>
                    {style}
                  </CategoryModalTagButton>
                ))}
              </CategoryModalTagInner>
            </CategoryModalTagWrap>
            <CategoryComplete onClick={() => setIsModal(!isModal)}>완료</CategoryComplete>
          </CategoryModalInner>
        </CategoryModalWrap>
      )}
    </div>
  );
};

export default PostCreateCategory;
