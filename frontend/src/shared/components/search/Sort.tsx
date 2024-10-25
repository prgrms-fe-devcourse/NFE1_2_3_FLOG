import styled from "styled-components";

import SelectIcon from '../asset/Select.png'

const SortSelect = styled.select`
  appearance: none;
  border: none;
  padding: 0;
  width: 85px;

  font-size: 16px;
  color: #7d7d7d;
  letter-spacing: -0.025em;

  background-image: url(${SelectIcon});
  background-size: auto;
  background-repeat: no-repeat;
  background-position: top 50% right 0;

  &:focus {
    outline: none;
  }
`;

const Sort = () => {
  return (
    <SortSelect>
      <option value="최신순">최신순</option>
      <option value="좋아요순">좋아요순</option>
    </SortSelect>
  );
};

export default Sort;