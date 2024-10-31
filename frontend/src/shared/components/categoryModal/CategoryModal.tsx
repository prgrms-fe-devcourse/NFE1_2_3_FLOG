import "../animation.css";

import styled from "styled-components";
import { useEffect, useState } from "react";

import Exit from "../asset/Exit.svg";
import { categoryData } from "./mockData";

interface KeywordTypes {
  gender: string;
  age: string;
  style: string;
}

interface CategoryProps {
  onModal: () => void;
  onEditKeyword?: (key: keyof KeywordTypes, value: string) => void; // 옵셔널로 변경
}

interface CategoryData {
  genderFilter: string[];
  ageFilter: string[];
  styleFilter: string[];
}

interface CategoryButtonTypes {
  isClicked?: boolean;
}

const CategoryModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
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
  box-sizing: border-box;
`;

const CategoryModalTitle = styled.p`
  font-size: 20px;
  color: #212529;
  text-align: center;
  margin-bottom: 45px;
`;

const CategoryModalExitButton = styled.div`
  position: absolute;
  top: 25px;
  right: 38px;
  cursor: pointer;
  & > img {
    display: block;
  }
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

const CategoryModal: React.FC<CategoryProps> = ({ onModal, onEditKeyword }) => {
  // 페이드 애니메이션
  const [fade, setFade] = useState("");

  const [category, setCategory] = useState<CategoryData>(categoryData);

  const [genderKeyword, setGenderKeyword] = useState<string[]>([]);
  const [ageKeyword, setAgeKeyword] = useState<string[]>([]);
  const [styleKeyword, setStyleKeyword] = useState<string[]>([]);

const handleCategorySelect = (key: keyof KeywordTypes, value: string) => {
  // 선택할 때 기존 선택과 비교하여 다중 선택을 반영
  const setKeyword = (prevState: string[]) => {
    // '전체' 클릭 시 다른 선택 초기화
    if (value === "전체") {
      // '전체' 클릭 시 다른 선택 초기화 후 '전체'만 유지
      return ["전체"];
    } else {
      // 다른 항목 선택 시 '전체'가 선택된 상태면 해제
      const newState = prevState.includes("전체") ? [] : prevState;
      // 이미 선택된 경우 취소, 그렇지 않으면 추가
      return newState.includes(value) ? newState.filter((v) => v !== value) : [...newState, value];
    }
  };

  if (key === "gender") {
    setGenderKeyword((prev) => setKeyword(prev));
    if (onEditKeyword) onEditKeyword(key, value);
  } else if (key === "age") {
    setAgeKeyword((prev) => setKeyword(prev));
    if (onEditKeyword) onEditKeyword(key, value);
  } else if (key === "style") {
    setStyleKeyword((prev) => setKeyword(prev));
    if (onEditKeyword) onEditKeyword(key, value);
  }
};

  // style은 영어로 되어있어서 한글로 번역함
  const translateStyle = (style: string) => {
    switch (style) {
      case "casual":
        return "캐쥬얼";
      case "street":
        return "스트릿";
      case "feminine":
        return "페미닌";
      case "punk":
        return "펑크";
      case "sporty":
        return "스포티";
      case "business":
        return "비즈니스";
      case "전체":
        return "전체";
    }
  };

  // 페이드 애니메이션
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFade("end");
    }, 50);
    return () => {
      clearTimeout(fadeTimer);
      setFade("");
    };
  }, []);

  return (
    <CategoryModalWrap className={`start ${fade}`}>
      <CategoryModalInner>
        {/* 카테고리 타이틀 */}
        <CategoryModalTitle>카테고리</CategoryModalTitle>

        {/* 모달 닫기 버튼 */}
        <CategoryModalExitButton onClick={onModal}>
          <img src={Exit} alt="모달닫기" />
        </CategoryModalExitButton>

        {/* 카테고리 하단 래퍼 */}
        <CategoryModalTagWrap>
          {/* 카테고리 종류 성별 */}
          <CategoryModalTagTitle>성별</CategoryModalTagTitle>

          {/* 카테고리 버튼 래퍼 */}
          <CategoryModalTagInner>
          {category.genderFilter.map((gender, index) => (
            <CategoryModalTagButton
              key={index}
              onClick={() => handleCategorySelect("gender", gender)}
              isClicked={genderKeyword.includes(gender)}
            >
              {gender}
            </CategoryModalTagButton>
          ))}
          </CategoryModalTagInner>
        </CategoryModalTagWrap>

        {/* 카테고리 하단 래퍼 */}
        <CategoryModalTagWrap>
          {/* 카테고리 종류 나이 */}
          <CategoryModalTagTitle>나이</CategoryModalTagTitle>

          {/* 카테고리 버튼 래퍼 */}
          <CategoryModalTagInner>
          {category.ageFilter.map((age, index) => (
            <CategoryModalTagButton
              key={index}
              onClick={() => handleCategorySelect("age", age)}
              isClicked={ageKeyword.includes(age)}
            >
              {age}
            </CategoryModalTagButton>
          ))}
          </CategoryModalTagInner>
        </CategoryModalTagWrap>

        {/* 카테고리 하단 래퍼 */}
        <CategoryModalTagWrap>
          {/* 카테고리 종류 스타일 */}
          <CategoryModalTagTitle>스타일</CategoryModalTagTitle>

          {/* 카테고리 버튼 래퍼 */}
          <CategoryModalTagInner>
          {category.styleFilter.map((style, index) => (
            <CategoryModalTagButton
              key={index}
              onClick={() => handleCategorySelect("style", style)}
              isClicked={styleKeyword.includes(style)}
            >
              {translateStyle(style)}
            </CategoryModalTagButton>
          ))}
          </CategoryModalTagInner>
        </CategoryModalTagWrap>

        <CategoryComplete onClick={onModal}>완료</CategoryComplete>
      </CategoryModalInner>
    </CategoryModalWrap>
  );
};

export default CategoryModal;
