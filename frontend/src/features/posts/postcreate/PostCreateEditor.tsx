import { useState, useRef, useEffect, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import usePostCreateStore from "./PostCreateStore";
import axios from "axios";

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
  const quillRef = useRef();
  const formats = ["size", "align", "color", "background", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input?.files[0];
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post("http://localhost:5000/api/posts/img", formData);
        const imageUrl = response.data.url;
        if (!data.thumbnail) {
          setData({ thumbnail: imageUrl });
        }
        console.log("사진 url :", imageUrl);
        const editor = quillRef?.current?.getEditor();
        console.log("editor:", editor);
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", imageUrl);
        // editor.root.innerHTML += `<img src=${imageUrl} alt="사진첨부"/><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.
      } catch (error) {
        console.error("Image upload failed", error);
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ["huge", "large", false, "small"] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  useEffect(() => {
    setData({ ...data, content: value });
  }, [value]);

  return (
    <Editor>
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
    </Editor>
  );
};

export default PostCreateEditor;
