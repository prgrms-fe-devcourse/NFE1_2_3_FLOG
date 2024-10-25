import styled from 'styled-components';

import PostTemplate from '../../shared/components/postTemplate/PostTemplate';
import SideBar from '../../shared/components/sidebar/SideBar';

const StorePromotionPageWrapper = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1304px;
  margin: 50px auto 0;
`;

const StorePromotionPage = () => {
  return (
    <StorePromotionPageWrapper>
      <PostTemplate />
      <SideBar />
    </StorePromotionPageWrapper>
  );
};

export default StorePromotionPage;