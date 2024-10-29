import styled from "styled-components";

const DetailText = styled.p`
  color: #212529;
  font-weight: regular;
  line-height: 2;
  font-size: 18px;
  margin-block: 20px;
`;

interface PostDetailProps {
  content: string;
}

const PostDetailText = ({ content }: PostDetailProps) => {
  return <DetailText>{content}</DetailText>;
};
export default PostDetailText;
