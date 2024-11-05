import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import PostComments from "../../features/posts/postdetail/PostComments";
import CurationCreateTitle from "../../features/curation/CurationCreateTitle";
import CurationCreateThumbnail from "../../features/curation/CurationCreateThumbnail";
import CurationCreateDatePicker from "../../features/curation/CurationCreateDatePicker";
import CurationCreateTag from "../../features/curation/CurationCreateTag";
import CurationCreateCategory from "../../features/curation/CurationCreateCategory";
import CurationCreateEditor from "../../features/curation/CurationCreateEditor";
import CurationDraftButtons from "../../features/curation/CurationDraftButtons";
import CurationEditButtons from "../../features/curation/CurationEditButtons";
import useCurationCreateStore from "../../features/curation/CurationCreateStore";
import heartIcon from "/heart.svg";
import heartFilledIcon from "/heartFilled.svg";
import commentIcon from "/comment.svg";


// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const SectionWrapper = styled.div`
  margin-bottom: 40px; // 섹션 간 간격 추가
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap; // 줄 바꿈을 허용하여 여러 줄로 표시되게 함
  gap: 10px; // 요소 간의 간격 설정
  margin-bottom: 20px;
`;

const FilterItem = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  background-color: #f9f4f4; // 배경색 추가
  color: #7d7d7d;
  font-size: 14px;
  margin: 0px; // 각 항목의 기본 여백 제거
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const DateRange = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
`;

const DateText = styled.span`
  margin-right: auto;
`;

const AdminActions = styled.div`
  display: flex;
  gap: 10px;
`;

const AdminActionLink = styled.span`
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;

  &:hover {
    text-decoration: none;
  }
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 40px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const TagItem = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  background-color: #e3f2fd;
  color: #0277bd;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  display: block; // 중앙 정렬을 위해 block으로 설정
  margin: 20px auto; // 수평 중앙 정렬
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const EntryListWrapper = styled.div`
  margin-top: 40px;
`;

const EntryTitleContainer = styled.h2`
  margin-bottom: 20px;
  text-align: left;
`;

const EntryListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 한 줄에 3개씩 배치
  gap: 20px;
  margin-top: 40px;
`;

const EntryItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; // 요소들을 위아래로 균등하게 배치
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%; // 카드의 전체 높이 설정
  aspect-ratio: 3 / 4; // 3:4 비율 유지
  overflow: hidden;
  height: 100%; // 부모의 높이를 유지
`;

const EntryTitle = styled.h3`
  font-size: 16px;
  margin: 5px 0;
  text-align: center;
  flex-shrink: 0; // 제목의 크기 고정
`;

const EntryImage = styled.img`
  width: 100%; // 컨테이너에 맞추어 가로 크기를 설정
  max-width: 150px; // 이미지의 최대 너비 고정
  height: auto; // 자동으로 높이를 조절하여 정사각형 유지
  aspect-ratio: 1 / 1; // 정사각형 비율 유지
  object-fit: cover; // 이미지가 잘리지 않고 꽉 차도록 설정
  border-radius: 5px;
  margin-bottom: 10px;
`;

const EntryDescription = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 2px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; // 설명이 길 경우 줄 바꿈 방지
  flex-grow: 1; // 공간을 채우도록 함
  min-height: 20px; // 작성자 텍스트의 최소 높이 설정
`;

const ProfileImgWrap = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  & > img {
    image-rendering: pixelated;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileNickname = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #7d7d7d;
  margin-left: 10px;
`;

const PostFlexStartWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px; // 프로필과 설명 사이의 여백 추가
`;

const EntryVotes = styled.p`
   font-size: 14px;
  color: #999;
  margin: 5px 0;
  text-align: center;
  flex-shrink: 0; // 투표 수의 높이 고정
`;

const VoteButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: auto; // 버튼을 아래로 고정
  flex-shrink: 0; // 크기 축소 방지
`;

// Photo slider styles
const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

const SliderButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ReactionBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
   margin-bottom: 20px; 
`;

const ReactionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  color: #7d7d7d;
  font-size: 14px;
`;

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

const LikeCount = styled.p`
  margin: 0;
  font-size: 14px;
`;

const CommentCount = styled.p`
  margin: 0;
  font-size: 14px;
`;
interface ICuration {
  title: string;
  startDate: string;
  endDate: string;
  content: string[];
  genderFilter: string[];
  ageFilter: string[];
  styleFilter: string[];
  tags: string[];
  status: 'published' | 'draft';
  comments: string[];
}
interface IEntry {
  _id: string;
  title: string;
  authorId: { _id: string; nickname: string; profileImage?: string;};
  photos: string[];
  description: string;
  votes: string[]; // User ID 배열로 투표자 정보가 들어있음
}

// CurationDetailPage Component
const CurationDetailPage = (): JSX.Element => {
  const { curationId } = useParams<{ curationId: string }>();
  const [curation, setCuration] = useState<ICuration | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const { setData } = useCurationCreateStore(); 
  const navigate = useNavigate();
  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  

  useEffect(() => {
    // 로그인 상태 확인 함수
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("userRole");
      setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
      setIsAdmin(localStorage.getItem("userRole") === "admin"); 

      console.log("로그인 여부:", !!token, "어드민 여부:", userRole === "admin");
    };

    // 컴포넌트가 처음 마운트될 때 로그인 상태 확인
    checkLoginStatus();

    // storage 이벤트로 로컬 스토리지 변경 감지
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    window.addEventListener("storage", handleStorageChange);

    // 클린업 함수로 이벤트 리스너 제거
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchCuration = async () => {
      if (!curationId) return;

      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(
          `http://localhost:5000/api/curations/${curationId}`,
          { headers }
        );

        const fetchedCuration = response.data.curation;

        setCuration(fetchedCuration);
        setLikeCount(fetchedCuration.likes.length);
        setCommentCount(fetchedCuration.comments.length);
        setIsLiked(fetchedCuration.likes.includes(localStorage.getItem("userId")!));

        // content 배열을 하나의 문자열로 변환
        const contentString = fetchedCuration.content.join("\n\n");

         // Zustand store에 데이터를 설정하여 수정 모드에서 반영되도록 함
         setData({
          title: fetchedCuration.title,
          thumbnail: fetchedCuration.thumbnail || '',
          startDate: new Date(fetchedCuration.startDate),
          endDate: new Date(fetchedCuration.endDate),
          content: [contentString],
          tags: fetchedCuration.tags,
          genderFilter: fetchedCuration.genderFilter,
          ageFilter: fetchedCuration.ageFilter,
          styleFilter: fetchedCuration.styleFilter,
          status: fetchedCuration.status,
        });
      } catch (error) {
        console.error("큐레이션 데이터를 불러오지 못했습니다.", error);
        navigate(-1); // 이전 페이지로 이동
      }
    };

    fetchCuration();
  }, [curationId, isAdmin, navigate]);

  // 출품작 리스트 가져오기 (투표 수로 정렬)
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/curations/${curationId}/entries`
        );
        const sortedEntries = response.data.entries.sort(
          (a: IEntry, b: IEntry) => b.votes.length - a.votes.length
        );
        setEntries(sortedEntries);
      } catch (error) {
        console.error("출품작을 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchEntries();
  }, [curationId]);

  // 투표 핸들러
  const handleVote = async (entryId: string) => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/entries/${entryId}/vote`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("투표가 완료되었습니다.");
      // 투표 후 다시 데이터 불러오기
      const updatedEntries = await axios.get(
        `http://localhost:5000/api/curations/${curationId}/entries`
      );
      setEntries(
        updatedEntries.data.entries.sort(
          (a: IEntry, b: IEntry) => b.votes.length - a.votes.length
        )
      );
    } catch (error) {
      console.error("투표 중 오류가 발생했습니다.", error);
      alert("투표 중 오류가 발생했습니다.");
    }
  };

  const handleSubmitClick = async () => {
    if (!isLoggedIn) {
      navigate('/signin', { state: { from: `/curation/${curationId}` } });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/curations/${curationId}/entries`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      console.log('API 응답 데이터:', response.data);

      const entries = response.data.entries || [];
      const userId = localStorage.getItem('userId');

      if (!userId) {
        alert("로그인이 필요합니다.");
        navigate("/signin");
        return;
      }

      const userHasEntry = entries.some((entry: IEntry) => entry.authorId?._id === userId);

      if (userHasEntry) {
        alert('이미 큐레이션에 참여하셨습니다!');
      } else {
        navigate(`/curation/${curationId}/submit`);
      }
    } catch (error) {
      console.error('출품 여부 확인 중 오류가 발생했습니다.', error);
      alert('출품 여부 확인 중 오류가 발생했습니다.');
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleDeleteClick = async () => {
    if (window.confirm("큐레이션을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:5000/api/curations/${curationId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert("큐레이션이 삭제되었습니다.");
        navigate("/"); // 메인 페이지로 이동
      } catch (error) {
        console.error("큐레이션 삭제 중 오류가 발생했습니다.", error);
        alert("큐레이션 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleLikeToggle = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/curations/${curationId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsLiked(!isLiked);
      setLikeCount(response.data.likes);
    } catch (error) {
      console.error("좋아요 토글 중 오류 발생:", error);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  if (!curation) {
    return <p>큐레이션 정보를 불러오는 중입니다...</p>;
  }

  return (
    <Container>
      {isEditMode ? (
        <div>
          <CurationCreateTitle />
          <CurationCreateThumbnail />
          <CurationCreateDatePicker />
          <CurationCreateTag />
          <CurationCreateCategory />
          <CurationCreateEditor />
          {curation?.status === 'published' ? (
            <CurationEditButtons />
          ) : (
            <CurationDraftButtons />
          )}
        </div>
      ) : (
        <>
          <Filters>
            <FilterItem>{curation.genderFilter.join(", ")}</FilterItem>
            <FilterItem>{curation.ageFilter.join(", ")}</FilterItem>
            <FilterItem>{curation.styleFilter.join(", ")}</FilterItem>
          </Filters>

          <Title>{curation.title}</Title>
          <DateRange>
            <DateText>
              {new Date(curation.startDate).toLocaleDateString()} -{" "}
              {new Date(curation.endDate).toLocaleDateString()}
            </DateText>
            {isAdmin && (
              <AdminActions>
                <AdminActionLink onClick={handleEditClick}>수정</AdminActionLink>
                <AdminActionLink onClick={handleDeleteClick}>삭제</AdminActionLink>
              </AdminActions>
            )}
          </DateRange>

          <Content>
          {curation.content.map((paragraph, index) => (
    <p key={index}>{stripHtmlTags(paragraph)}</p>
  ))}
          </Content>

          <TagsContainer>
            {curation.tags.map((tag, index) => (
              <TagItem key={index}>{tag}</TagItem>
            ))}
          </TagsContainer>

          {curation.status === 'published' && new Date(curation.endDate) > new Date() && (
            <SubmitButton onClick={handleSubmitClick}>큐레이션 제출</SubmitButton>
          )}

{curation.status === 'published' && (
  <SectionWrapper>
          <EntryListWrapper>
            <EntryTitleContainer>출품작 리스트</EntryTitleContainer>
            <EntryListContainer>
              {entries.map((entry) => (
                <EntryItem key={entry._id}>
                  <EntryTitle>{entry.title}</EntryTitle>
                  <PhotoSlider photos={entry.photos} />
                  <EntryDescription>{entry.description}</EntryDescription>
                  <Link to={`/user/${entry.authorId._id}`}>
      <PostFlexStartWrap>
        {entry.authorId.profileImage ? (
          <ProfileImgWrap>
            <img
              src={entry.authorId.profileImage}
              alt={`${entry.authorId.nickname}님의 프로필 사진`}
            />
          </ProfileImgWrap>
        ) : (
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#ddd",
            }}
          />
        )}
        <ProfileNickname>{entry.authorId.nickname}</ProfileNickname>
      </PostFlexStartWrap>
    </Link>
                  <EntryVotes>투표 수: {entry.votes.length}</EntryVotes>
                  <VoteButton onClick={() => handleVote(entry._id)}>투표하기</VoteButton>
                </EntryItem>
              ))}
            </EntryListContainer>
          </EntryListWrapper>
          </SectionWrapper>
        )}

        {/* 좋아요 및 댓글 아이콘 표시 */}
      <ReactionBox>
        <ReactionItem>
          <Button onClick={handleLikeToggle}>
            <img
              src={isLiked ? heartFilledIcon : heartIcon}
              alt={isLiked ? "좋아요 취소" : "좋아요"}
              style={{ width: "20px", height: "20px" }}
            />
          </Button>
          <LikeCount>{likeCount}개</LikeCount>
        </ReactionItem>
        <ReactionItem>
          <img
            src={commentIcon}
            alt="댓글"
            style={{ width: "20px", height: "20px" }}
          />
          <CommentCount>{commentCount}개</CommentCount>
        </ReactionItem>
      </ReactionBox>

          {curation && <PostComments postId={curationId!} postType="Curation" />}
        </>
      )}
    </Container>
  );
};

// PhotoSlider Component
interface PhotoSliderProps {
  photos: string[];
}

const PhotoSlider = ({ photos }: PhotoSliderProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePrev = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <SliderContainer>
      {photos.length > 1 && (
        <SliderButton onClick={handlePrev}>{"<"}</SliderButton>
      )}
      <EntryImage src={photos[currentPhotoIndex]} alt="출품작 사진" />
      {photos.length > 1 && (
        <SliderButton onClick={handleNext}>{">"}</SliderButton>
      )}
    </SliderContainer>
  );
};

export default CurationDetailPage;
