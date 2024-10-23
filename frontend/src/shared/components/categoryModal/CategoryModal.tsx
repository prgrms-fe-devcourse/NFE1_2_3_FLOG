import styled from "styled-components";

import Exit from '../asset/Exit.svg'

interface CategoryProps {
  onModal: () => void
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
`

const CategoryModalExitButton = styled.div`
  position: absolute;
  top: 25px;
  right: 38px;
  cursor: pointer;
  & > img {
    display: block;
  }
`

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
  background-color: #EDEAEA;
  border-radius: 10px;

  font-size: 14px;
  color: #212529;
  text-align: center;

  cursor: pointer;
`;

const CategoryModal: React.FC<CategoryProps> = ({ onModal }) => {
  return (
    <CategoryModalWrap>
      <CategoryModalInner>

        {/* 카테고리 타이틀 */}
        <CategoryModalTitle>
          카테고리
        </CategoryModalTitle>

        {/* 모달 닫기 버튼 */}
        <CategoryModalExitButton onClick={onModal}>
          <img src={Exit} alt="모달닫기" />
        </CategoryModalExitButton>

        {/* 카테고리 하단 래퍼 */}
        <CategoryModalTagWrap>
          {/* 카테고리 종류 */}
          <CategoryModalTagTitle>
            성별
          </CategoryModalTagTitle>

          {/* 카테고리 버튼 래퍼 */}
          <CategoryModalTagInner>
            <CategoryModalTagButton>
              전체
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              남자
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              여자
            </CategoryModalTagButton>
          </CategoryModalTagInner>
        </CategoryModalTagWrap>

        <CategoryModalTagWrap>
          <CategoryModalTagTitle>
            남자
          </CategoryModalTagTitle>
          <CategoryModalTagInner>
            <CategoryModalTagButton>
              ~ 9세
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              10 ~ 14세
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              15 ~ 19세
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              20 ~ 24세
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              25 ~ 29세
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              30 ~ 34세
            </CategoryModalTagButton>
          </CategoryModalTagInner>
        </CategoryModalTagWrap>

        <CategoryModalTagWrap>
          <CategoryModalTagTitle>
            스타일
          </CategoryModalTagTitle>
          <CategoryModalTagInner>
            <CategoryModalTagButton>
              전체
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              캐주얼
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              스트릿
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              페미닌
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              펑크
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              스포티
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              비지니스
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              댄디
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              포멀
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              미니멀
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              청순
            </CategoryModalTagButton>
            <CategoryModalTagButton>
              섹시
            </CategoryModalTagButton>
          </CategoryModalTagInner>
        </CategoryModalTagWrap>

      </CategoryModalInner>
    </CategoryModalWrap>
  );
};

export default CategoryModal;