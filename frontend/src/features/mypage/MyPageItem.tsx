import styled from "styled-components";
import testImg from "/testImg.png";
type LifetimeItemType = {
  brandName: string;
  productName: string;
  description: string;
  photoUrl: string;
};

const MyPageItem = ({ lifetimeItem }: { lifetimeItem?: LifetimeItemType }) => {
  if (!lifetimeItem) {
    return null;
  }
  const Hr = styled.hr`
    border: none;
    height: 0.1px;
    background: #cccccc;
    margin-top: 90px;
  `;
  const ItemBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
  `;
  const Text = styled.span`
    font-weight: bold;
    font-size: 18px;
  `;
  const NomalText = styled.span`
    font-weight: normal;
  `;
  const ItemDetailBox = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
  `;
  console.log(lifetimeItem);
  return (
    <div>
      <div>
        <h2>인생템</h2>
      </div>
      {lifetimeItem.productName === undefined ? (
        <div
          style={{
            display: "flex",
            marginTop: "50px",
            justifyContent: "center",
          }}
        >
          <h3 style={{ margin: "0px" }}>아직 인생템이 없어요!</h3>
        </div>
      ) : (
        <ItemBox>
          <div>
            <img
              src={lifetimeItem.photoUrl} // 서버에서 가져온 이미지 URL 사용
              alt={lifetimeItem.productName} // 제품 이름을 alt 속성으로 사용
              style={{ width: "150px", height: "auto", objectFit: "cover" }}
            />
          </div>
          <ItemDetailBox>
            <Text>
              {lifetimeItem.brandName}{" "}
              {lifetimeItem.brandName !== undefined && (
                <NomalText>의 </NomalText>
              )}
              <Text>{lifetimeItem.productName}</Text>
            </Text>
            <p>{lifetimeItem.description}</p>
          </ItemDetailBox>
        </ItemBox>
      )}
      <Hr />
    </div>
  );
};

export default MyPageItem;
