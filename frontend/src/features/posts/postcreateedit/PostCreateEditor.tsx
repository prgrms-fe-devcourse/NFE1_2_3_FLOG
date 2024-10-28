//src/features/posts/postcreateedit/PostCreateEditor.tsx
import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import usePostCreateStore from "./PostCreateStore";

const Editor = styled.div`
  width: 1000px;
  height: 800px;
  margin: 0 auto;
  margin-top: 10px;

  .ql-editor {
    font-size: 16px; // 원하는 기본 글씨 크기로 변경
  }
`;

const PostCreateEditor = () => {
  const { data, setData } = usePostCreateStore();
  const [value, setValue] = useState("");

  const quillRef = useRef<ReactQuill>(null);
  const formats = ["size", "align", "color", "background", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];
  const modules = {
    toolbar: [
      [{ size: ["huge", "large", false, "small"] }], // custom dropdown
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
    ],
  };

  return (
    <Editor>
      <ReactQuill
        ref={quillRef}
        style={{ width: "100%", height: "100%" }}
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        onChange={(content) => {
          setValue(content);
          setData({ ...data, content: `${content}` });
        }}
        placeholder="내용을 입력하세요."
      />
    </Editor>
  );
};

export default PostCreateEditor;
