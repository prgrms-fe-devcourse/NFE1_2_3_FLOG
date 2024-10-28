import styled from "styled-components";

import SelectIcon from '../asset/Select.png';

interface SortPropTypes {
  onSortingPost: (value: string) => void
}

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

const Sort: React.FC<SortPropTypes> = ({ onSortingPost }) => {
  return (
    <SortSelect onChange={(e) => onSortingPost(e.target.value)}>
      <option value="new">최신순</option>
      <option value="like">좋아요순</option>
      <option value="comment">댓글순</option>
    </SortSelect>
  );
};

export default Sort;