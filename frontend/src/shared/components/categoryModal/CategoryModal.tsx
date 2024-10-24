import "../animation.css";

import styled from "styled-components";
import { useEffect, useState } from "react";

import Exit from "../asset/Exit.svg";
import { categoryData } from "./mockData";
interface CategoryProps {
  onModal: () => void;
}

interface CategoryData {
  genderFilter: string[];
  ageFilter: string[];
  styleFilter: string[];
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

const CategoryModalTagButton = styled.div`
  width: 84px;
  line-height: 31px;
  height: 31px;
  background-color: #edeaea;
  border-radius: 10px;

  font-size: 14px;
  color: #212529;
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

const CategoryModal: React.FC<CategoryProps> = ({ onModal }) => {
  // 페이드 애니메이션
  const [fade, setFade] = useState("");

  const [category, setCategory] = useState<CategoryData>(categoryData);

  // 페이드 애니메이션
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFade("end");
    }, 50);
    return () => {
      clearTimeout(fadeTimer);
      setFade("");
    };
  }, [onModal]);

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
            {category.genderFilter.map((gender, index) => {
              return (
                <CategoryModalTagButton key={index}>
                  {gender}
                </CategoryModalTagButton>
              );
            })}
          </CategoryModalTagInner>
        </CategoryModalTagWrap>

        {/* 카테고리 하단 래퍼 */}
        <CategoryModalTagWrap>
          {/* 카테고리 종류 나이 */}
          <CategoryModalTagTitle>나이</CategoryModalTagTitle>

          {/* 카테고리 버튼 래퍼 */}
          <CategoryModalTagInner>
            {category.ageFilter.map((age, index) => {
              return (
                <CategoryModalTagButton key={index}>
                  {age}
                </CategoryModalTagButton>
              );
            })}
          </CategoryModalTagInner>
        </CategoryModalTagWrap>

        {/* 카테고리 하단 래퍼 */}
        <CategoryModalTagWrap>
          {/* 카테고리 종류 스타일 */}
          <CategoryModalTagTitle>스타일</CategoryModalTagTitle>

          {/* 카테고리 버튼 래퍼 */}
          <CategoryModalTagInner>
            {category.styleFilter.map((style, index) => {
              return (
                <CategoryModalTagButton key={index}>
                  {style}
                </CategoryModalTagButton>
              );
            })}
          </CategoryModalTagInner>
        </CategoryModalTagWrap>

        <CategoryComplete>
          완료
        </CategoryComplete>
      </CategoryModalInner>
    </CategoryModalWrap>
  );
};

export default CategoryModal;
