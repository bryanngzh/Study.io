import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import {
  Button,
  Text,
  Box
} from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import axios from 'axios'


//edit the tool bar to make it look nicer
const NoteEditor = (props) => {
  const [note, setNote] = useState()
  const [active, setActive] = useState(true)

  useEffect(() => {
    if (active) {
      if (localStorage.getItem("accessToken")) {
        const String = "/api/notedescription/" + props.id
        axios.get(String, {
          headers: {
            accessToken: localStorage.getItem("accessToken")
          },
        }).then((response) => {
          if (response.data.error) {
            alert(response.data.error)
          } else {
            setNote(response.data.content)
            setContent(response.data.content)
          }
        })
      }
    }
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content: '<p></p>',
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      axios.post("/api/notedescription/editNote", {
        id: props.id,
        content: json.content,
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
            }
        })
    },
  })

  const setContent = (n) => {
    editor.commands.setContent(
      {
        "type": "doc",
        "content": n
      }
    )
    setActive(false)
  }

  return (
    <>
      {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          size="xs"
        >
          B
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          size="xs"
        >
          <Text as='i'>i</Text>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
          size="xs"
        >
          <Text as='u'>U</Text>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
          size="xs"
        >
           <Text as='s'>S</Text>
        </Button>
      </BubbleMenu>}
      <EditorContent editor={editor} />
    </>
  )
}

export default NoteEditor