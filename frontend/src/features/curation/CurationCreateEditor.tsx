import { useState, useRef, useEffect, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import useCurationCreateStore from "./CurationCreateStore";

const Editor = styled.div`
  width: 1000px;
  height: 800px;
  margin: 0 auto;
  margin-top: 10px;

  .ql-editor {
    font-size: 16px;
  }
`;

const CurationCreateEditor = () => {
  const { data, setData } = useCurationCreateStore();
  const [contentArray, setContentArray] = useState<string[]>(data.content);

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
    // Zustand store에 업데이트
    setData({ content: contentArray });
  }, [contentArray]);

  // Quill 에디터의 내용을 배열로 관리하여 업데이트
  const handleEditorChange = (content: string) => {
    setContentArray((prev) => {
      const newContentArray = [...prev];
      newContentArray[0] = content; // 배열의 첫 번째 요소로 설정하거나, 로직에 맞게 변경 가능
      return newContentArray;
    });
  };

  return (
    <Editor>
      <ReactQuill
        ref={quillRef}
        style={{ width: "100%", height: "100%" }}
        theme="snow"
        value={contentArray[0] || ""} // 첫 번째 요소만 표시
        modules={modules}
        formats={formats}
        onChange={handleEditorChange}
        placeholder="내용을 입력하세요."
      />
    </Editor>
  );
};

export default CurationCreateEditor;
