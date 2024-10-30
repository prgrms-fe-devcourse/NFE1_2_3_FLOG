import styled from 'styled-components';

import CurationTemplate from '../../features/curation/CurationTemplate';
import SideBar from '../../shared/components/sidebar/SideBar';

const CurationPageWrapper = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1304px;
  margin: 50px auto 0;
`;

const CurationPage = () => {
  return (
    <CurationPageWrapper>
      <CurationTemplate />
      <SideBar />
    </CurationPageWrapper>
  );
};

export default CurationPage;
