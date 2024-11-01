import React, { useState } from "react";
import styled from "styled-components";
import Exit from "../../shared/components/asset/Exit.svg";
import useCurationCreateStore from "./CurationCreateStore";

const CategoryButton = styled.button`
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #7D7D7D;
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
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 2px 3px 20px #00000040;
`;

const CategoryModalTitle = styled.p`
  font-size: 20px;
  color: #212529;
  text-align: center;
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
`;

const CategoryModalTagInner = styled.div`
  display: flex;
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
  color: ${({ isClicked }) => (isClicked ? "#fff" : "#212529")};
  text-align: center;
  cursor: pointer;
`;

const CategoryComplete = styled.p`
  font-size: 14px;
  color: #212529;
  text-align: center;
  cursor: pointer;
`;

const CurationCreateCategory = () => {
  const [isModal, setIsModal] = useState(false);
  const genderOptions = ["전체", "남자", "여자"] as const;
  const ageOptions = ["전체", "10대 미만", "10대", "20대", "30대", "40대", "50대 이상"] as const;
  const styleOptions = ["전체", "캐쥬얼", "스트릿", "페미닌", "펑크", "스포티", "비즈니스"] as const;
  const { data, setData } = useCurationCreateStore();

  // 스타일 필터 매핑
  const styleMapping: { [key: string]: "casual" | "street" | "feminine" | "punk" | "sporty" | "business" | "전체" } = {
    "전체": "전체",
    "캐쥬얼": "casual",
    "스트릿": "street",
    "페미닌": "feminine",
    "펑크": "punk",
    "스포티": "sporty",
    "비즈니스": "business",
  };

  const handleGenderSelect = (value: typeof genderOptions[number]) => {
    const newGenderFilter: ("전체" | "남자" | "여자")[] =
      value === "전체"
        ? ["전체"]
        : data.genderFilter.includes(value)
        ? data.genderFilter.filter((g) => g !== value) as ("전체" | "남자" | "여자")[]
        : [...data.genderFilter.filter((g) => g !== "전체"), value];
    setData({ genderFilter: newGenderFilter });
  };

  const handleAgeSelect = (value: typeof ageOptions[number]) => {
    const newAgeFilter: ("전체" | "10대 미만" | "10대" | "20대" | "30대" | "40대" | "50대 이상")[] =
      value === "전체"
        ? ["전체"]
        : data.ageFilter.includes(value)
        ? data.ageFilter.filter((a) => a !== value)
        : [...data.ageFilter.filter((a) => a !== "전체"), value];
    setData({ ageFilter: newAgeFilter });
  };

  const handleStyleSelect = (value: typeof styleOptions[number]) => {
    const styleMapping: { [key: string]: "casual" | "street" | "feminine" | "punk" | "sporty" | "business" | "전체" } = {
      "전체": "전체",
      "캐쥬얼": "casual",
      "스트릿": "street",
      "페미닌": "feminine",
      "펑크": "punk",
      "스포티": "sporty",
      "비즈니스": "business",
    };
    const mappedValue = styleMapping[value];
    const newStyleFilter =
      mappedValue === "전체"
        ? ["전체"]
        : data.styleFilter.includes(mappedValue)
        ? data.styleFilter.filter((s) => s !== mappedValue)
        : [...data.styleFilter.filter((s) => s !== "전체"), mappedValue];
    setData({ styleFilter: newStyleFilter as ("전체" | "casual" | "street" | "feminine" | "punk" | "sporty" | "business")[] });
  };

  return (
    <div>
      <CategoryButton onClick={() => setIsModal(!isModal)}>카테고리</CategoryButton>
      {isModal && (
        <CategoryModalWrap>
          <CategoryModalInner>
            <CategoryModalTitle>카테고리</CategoryModalTitle>
            <CategoryModalExitButton src={Exit} onClick={() => setIsModal(!isModal)} />
            <CategoryModalTagWrap>
              <CategoryModalTagTitle>성별</CategoryModalTagTitle>
              <CategoryModalTagInner>
                {genderOptions.map((gender) => (
                  <CategoryModalTagButton
                    key={gender}
                    isClicked={data.genderFilter.includes(gender)}
                    onClick={() => handleGenderSelect(gender)}
                  >
                    {gender}
                  </CategoryModalTagButton>
                ))}
              </CategoryModalTagInner>
            </CategoryModalTagWrap>
            <CategoryModalTagWrap>
              <CategoryModalTagTitle>나이</CategoryModalTagTitle>
              <CategoryModalTagInner>
                {ageOptions.map((age) => (
                  <CategoryModalTagButton
                    key={age}
                    isClicked={data.ageFilter.includes(age)}
                    onClick={() => handleAgeSelect(age)}
                  >
                    {age}
                  </CategoryModalTagButton>
                ))}
                </CategoryModalTagInner>
              </CategoryModalTagWrap>
            <CategoryModalTagWrap>
              <CategoryModalTagTitle>스타일</CategoryModalTagTitle>
              <CategoryModalTagInner>
                {styleOptions.map((style) => (
                  <CategoryModalTagButton
                    key={style}
                    isClicked={data.styleFilter.includes(styleMapping[style])}
                    onClick={() => handleStyleSelect(style)}
                  >
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

export default CurationCreateCategory;
