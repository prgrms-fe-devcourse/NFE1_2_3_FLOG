import styled from "styled-components";
import testImg from "/testImg.png";

const MyPageItem = () => {
  const Hr = styled.hr`
    border: none;
    height: 0.1px;
    background: #cccccc;
    margin-top: 50px;
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
  return (
    <div>
      <div>
        <h2>인생템</h2>
      </div>
      <ItemBox>
        <div>
          <img
            src={testImg}
            alt="testImg"
            style={{ width: "150px", height: "auto", objectFit: "cover" }}
          ></img>
        </div>
        <ItemDetailBox>
          <Text>
            브랜드네임 <NomalText>의 </NomalText>
            <Text>아이템이름</Text>
          </Text>
          <p>
            이랓니츠ㅐ댜ㅡ채ㅑㅈ드챠ㅐㄷ줓ㄹㄷㅇㅇㅇㅇㅇㅇㅇㅇㅇ이랓니츠ㅐ댜ㅡ채ㅑㅈ드챠ㅐㄷ줓ㄹㄷㅇㅇㅇㅇㅇㅇㅇㅇㅇ이랓니츠ㅐ댜ㅡ채ㅑㅈ드챠ㅐㄷ줓ㄹㄷㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ이랓니츠ㅐ댜ㅡ채ㅑㅈ드챠ㅐㄷ줓ㄹㄷㅇㅇㅇㅇㅇㅇㅇㅇㅇ이랓니츠ㅐ댜ㅡ채ㅑㅈ드챠ㅐㄷ줓ㄹㄷㅇㅇㅇㅇㅇㅇㅇㅇㅇ이랓니츠ㅐ댜ㅡ채ㅑㅈ드챠ㅐㄷ줓ㄹㄷㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
          </p>
        </ItemDetailBox>
      </ItemBox>
      <Hr />
    </div>
  );
};

export default MyPageItem;
