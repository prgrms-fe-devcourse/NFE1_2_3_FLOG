import { useEffect, useState } from "react";
import styled from "styled-components";
import MyPageHeader from "../../features/mypage/MyPageHeader";
import AddImage from "../../features/mypage/AddImage";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 864px;
  margin-top: 50px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #cccccc;
  line-height: 1.5;
  resize: none;
  overflow: hidden;
  &:focus {
    outline: none;
  }
  margin-bottom: 10px;
  color: #7d7d7d;
  padding: 5px;
`;

const MyPageEdit = () => {
  const [blogName, setBlogName] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [lifeItems, setLifeItems] = useState(["", "", ""]);

  useEffect(() => {
    // DB에서 값 가져오기 (가상의 API 호출)
    const fetchData = async () => {
      // 예시 데이터: 실제 API 호출로 대체해야 함
      const dataFromDB = {
        blogName: "내블로그",
        nickname: "내닉넴",
        introduction: "",
        lifeItems: ["브랜드임", "", "좋음"],
      };

      setBlogName(dataFromDB.blogName || "블로그 이름을 입력하세요");
      setNickname(dataFromDB.nickname || "닉네임을 입력하세요");
      setIntroduction(dataFromDB.introduction || "소개를 입력하세요");
      setLifeItems(
        dataFromDB.lifeItems.length
          ? dataFromDB.lifeItems
          : [
              "브랜드 이름을 입력하세요",
              "아이템 이름을 입력하세요",
              "아이템을 소개해주세요",
            ]
      );
    };

    fetchData();
  }, []);

  return (
    <div>
      <MyPageHeader />
      <Box>
        <AddImage
          isUpload={false}
          onChangeUpload={false}
          onChangeImgDelete={false}
          postImage={null}
          onChangeImage={null}
          isProfile={true}
        />
        <div>
          <h3>블로그 이름</h3>
          <Input
            placeholder={blogName}
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
          />
        </div>
        <div>
          <h3>닉네임</h3>
          <Input
            placeholder={nickname}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div>
          <h3>소개</h3>
          <Input
            placeholder={introduction}
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />
        </div>
        <div>
          <h3>인생템</h3>
          <div>
            {lifeItems.map((item, index) => (
              <Input
                key={index}
                placeholder={item || `인생템 ${index + 1}`}
                value={item}
                onChange={(e) => {
                  const newLifeItems = [...lifeItems];
                  newLifeItems[index] = e.target.value;
                  setLifeItems(newLifeItems);
                }}
              />
            ))}
            <AddImage
              isUpload={false}
              onChangeUpload={false}
              onChangeImgDelete={false}
              postImage={null}
              onChangeImage={null}
              isProfile={false}
            />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default MyPageEdit;
