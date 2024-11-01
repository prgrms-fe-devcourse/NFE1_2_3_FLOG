import { useState, useRef, useEffect, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import usePostEditStore from "./usePostEditStore";

const Editor = styled.div`
  width: 1000px;
  height: 800px;
  margin: 0 auto;
  margin-top: 10px;

  .ql-editor {
    font-size: 16px; // 원하는 기본 글씨 크기로 변경
  }
`;

const PostEditEditor = () => {
  const { onClick, isOnClick, data, setData } = usePostEditStore();
  const [value, setValue] = useState(""); // 초기값을 빈 문자열로 설정
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const quillRef = useRef<ReactQuill>(null);
  const formats = ["size", "align", "color", "background", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ size: ["huge", "large", false, "small"] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
      ],
    }),
    []
  );

  useEffect(() => {
    if (data.content) {
      setValue(data.content); // 데이터가 로드되면 value 업데이트
      setIsLoading(false); // 로딩 상태 해제
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      console.log(data.content);
      setData({ content: value });
    }
  }, [value, isLoading]);

  // useEffect(() => {
  //   if (onClick) {
  //     setData({ content: value });
  //   }
  // }, [onClick, isOnClick]);

  return (
    <Editor>
      {isLoading ? (
        <div>Loading...</div> // 로딩 중일 때 표시할 내용
      ) : (
        <ReactQuill
          ref={quillRef}
          style={{ width: "100%", height: "100%" }}
          theme="snow"
          value={value}
          modules={modules}
          formats={formats}
          onChange={setValue}
          placeholder="내용을 입력하세요."
        />
      )}
    </Editor>
  );
};

export default PostEditEditor;
