//src/features/posts/postcreateedit/PostCreateEditor.tsx
import { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const Editor = styled.div`
  width: 1000px;
  height: 800px;
  margin: 0 auto;
  margin-top: 10px;
`;

const PostCreateEditor = () => {
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);
  return (
    <Editor>
      <ReactQuill
        style={{ width: "100%", height: "100%" }}
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="내용을 입력하세요."
      />
    </Editor>
  );
};

export default PostCreateEditor;
