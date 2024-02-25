// Module files import
import React, { useState, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import quillEmoji from "react-quill-emoji";
import "react-quill-emoji/dist/quill-emoji.css";
import "quill-paste-smart";
import parse from "html-react-parser";
import quillFocus from "quill-focus";
import "quill-focus/docs/quill-focus.css";
// import QuillCursors from "quill-cursors";
// import "../assets/quill-cursors.css";

// custom toolbar with modules
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
      ["emoji"],
    ],
  },
  // cursors: true,
  "emoji-toolbar": true,
  "emoji-textarea": true,
  "emoji-shortname": true,
  clipboard: {
    allowed: {
      tags: ["span", "a", "p"],
      attributes: ["href", "rel", "target", "class"],
    },
    keepSelection: true,
    substituteBlockElements: true,
    magicPasteLinks: true,
    hooks: {
      uponSanitizeElement(node, data, config) {
        console.log(node);
      },
    },
  },
  focus: {
    focusClass: "focused-blot",
  },
};
const ReactQuillComponent = () => {
  // state variables
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // onChange function
  const handleTitle = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  // register
  Quill.register(
    {
      "formats/emoji": quillEmoji.EmojiBlot,
      "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
      "modules/emoji-textarea": quillEmoji.TextAreaEmoji,
      "modules/emoji-shortname": quillEmoji.ShortNameEmoji,
    },
    true
  );
  Quill.register("modules/focus", quillFocus);
  // Quill.register("modules/cursors", QuillCursors);

  // render
  return (
    <>
      <div>
        <h2 className="text-4xl text-center font-semibold py-4">
          Quill Rich Text Editor
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-4">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Title */}
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  onChange={handleTitle}
                  type="text"
                  value={title}
                  name="title"
                  id="title"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  placeholder="Type the title"
                />
              </div>
            </div>
            {/* Content */}
            <div className="sm:col-span-2">
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Content
              </label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Title */}
            <div className="sm:col-span-2">
              <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                Title
              </h2>
              <div className="mt-2">
                <p className="text-2xl font-bold">{title}</p>
              </div>
            </div>
            <div className="sm:col-span-full">
              <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Content
              </h2>
              {parse(content)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReactQuillComponent;
