import { useState, useEffect, useRef, useCallback, Component} from 'react';
import { LightMode } from '@chakra-ui/react';
import Quill from "quill"
import "quill/dist/quill.snow.css"

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]
 
const Note = () => {

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return
    wrapper.innerHTML = ""
    const editor = document.createElement('div')
    wrapper.append(editor)
    new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },})
    //fds
  }, [])


  return (
      <div id="container" ref={wrapperRef}></div>
  );
}
 
export default Note;