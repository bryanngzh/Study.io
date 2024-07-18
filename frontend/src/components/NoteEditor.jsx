import "../styles/noteEditor.scss"
import { BubbleMenu, useEditor, EditorContent, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Blockquote from '@tiptap/extension-blockquote'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import CharacterCount from '@tiptap/extension-character-count'
import { Color } from '@tiptap/extension-color'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import {
  Button,
  Text as Text1,
  Box,
  Tooltip,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { FaFilePdf } from "react-icons/fa"
import { useEffect, useState } from 'react'
import axios from 'axios'
import html2pdf from 'html2pdf.js'

//edit the tool bar to make it look nicer
const NoteEditor = (props) => {
  const [note, setNote] = useState()
  const [active, setActive] = useState(true)
  const buttonColor = "telegram"

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
      CodeBlockLowlight.configure({
        lowlight,
        // languageClassPrefix: 'language-javascript',
      }),
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
        codeBlock: false,
      }),
      Underline,
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Blockquote,
      Text,
      TextStyle,
      FontFamily,
      CharacterCount.configure({
        limit: null,
      }),
      Color,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      const html = editor.getHTML()
      axios.post("/api/notedescription/editNote", {
        id: props.id,
        content: json.content,
        htmlContent: html
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

  const exportHtml = () => {
    var html = editor.getHTML()
    html = html + "<br>"

    html = '<html><head><link rel = "stylesheet" href = "..//styles//noteEditor.css" ></head> <body>' + html + "</body></html>"
    console.log(html)
    var opt = {
      margin:       1,
      filename:     props.name,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, allowTaint:true, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(html).save();
  }

  if (!editor) {
    return null
  }

  return (
    <div title="noteeditor">
      {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <Tooltip label="Bold" aria-label='A tooltip' placement='top'>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            size="xs"
            colorScheme={buttonColor}
          >
            B
          </Button>
        </Tooltip>
        <Tooltip label="italicise" aria-label='A tooltip' placement='top'>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            size="xs"
            colorScheme={buttonColor}
          >
            <Text1 as='i'>i</Text1>
          </Button>
        </Tooltip>
        <Tooltip label="Underline" aria-label='A tooltip' placement='top'>
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
            size="xs"
            colorScheme={buttonColor}
          >
            <Text1 as='u'>U</Text1>
          </Button>
        </Tooltip>
        <Tooltip label="Highlight" aria-label='A tooltip' placement='top'>
          <Button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'is-active' : ''}
            size="xs"
            colorScheme={buttonColor}
          >
            <Text1>H</Text1>
          </Button>
        </Tooltip>
        <Tooltip label="Strikethrough" aria-label='A tooltip' placement='top'>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
            size="xs"
            colorScheme={buttonColor}
          >
            <Text1 as='s'>S</Text1>
          </Button>
        </Tooltip>
        
          <Menu closeOnSelect={false}>
            <Tooltip label="Font" aria-label='A tooltip' placement='top'>
              <MenuButton as={Button} size="xs" colorScheme={buttonColor} rightIcon={<ChevronDownIcon />}>
                Font
              </MenuButton>
            </Tooltip>
            <MenuList>
                <MenuOptionGroup defaultValue='none' type='radio'>
                  <MenuItemOption
                    value='none'
                    onClick={() => editor.chain().focus().unsetFontFamily().run()}>
                    <text>Default</text>
                  </MenuItemOption>
                  <MenuItemOption
                    value='inter'
                    onClick={() => editor.chain().focus().setFontFamily('Inter').run()}
                    className={editor.isActive('textStyle', { fontFamily: 'Inter' }) ? 'is-active' : ''}>
                    <p><span style={{ fontFamily: "Inter" }}>Inter</span></p>
                  </MenuItemOption>
                  <MenuItemOption
                    value='comic'
                    onClick={() => editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()}
                    className={
                      editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' })
                        ? 'is-active'
                        : ''
                    }>
                    <p><span style={{ fontFamily: "Comic Sans MS, Comic Sans" }}>Comic Sans</span></p>
                  </MenuItemOption>
                  <MenuItemOption
                    value='serif'
                    onClick={() => editor.chain().focus().setFontFamily('serif').run()}
                    className={editor.isActive('textStyle', { fontFamily: 'serif' }) ? 'is-active' : ''}>
                    <p><span style={{ fontFamily: "serif" }}>serif</span></p>
                  </MenuItemOption>
                  <MenuItemOption
                    value='mono'
                    onClick={() => editor.chain().focus().setFontFamily('monospace').run()}
                    className={editor.isActive('textStyle', { fontFamily: 'monospace' }) ? 'is-active' : ''}>
                    <p><span style={{ fontFamily: "monospace" }}>monospace</span></p>
                  </MenuItemOption>
                  <MenuItemOption
                    value='cursive'
                    onClick={() => editor.chain().focus().setFontFamily('cursive').run()}
                    className={editor.isActive('textStyle', { fontFamily: 'cursive' }) ? 'is-active' : ''}>
                    <p><span style={{ fontFamily: "cursive" }}>cursive</span></p>
                  </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        
        <Menu closeOnSelect={false}>
          <Tooltip label="Text Colour" aria-label='A tooltip' placement='top'>
            <MenuButton as={Button} size="xs" colorScheme={buttonColor} rightIcon={<ChevronDownIcon />}>
              A
            </MenuButton>
          </Tooltip>
            <MenuList>
                
                  <MenuItemOption>
                  <input
                    type="color"
                    onInput={event => editor.chain().focus().setColor(event.target.value).run()}
                    value={editor.getAttributes('textStyle').color}
                  />
                  </MenuItemOption>
                  <MenuItemOption
                    value='black'
                    onClick={() => editor.chain().focus().unsetColor().run()}
                  >
                    <p><span style={{ fontWeight: 'bold'}}>A</span> Default</p>
                  </MenuItemOption>
                  <MenuItemOption
                    value='purple'
                    onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                    className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
                  >
                    <p><span style={{ color: '#958DF1', fontWeight: 'bold'}}>A</span> Purple</p>
                  </MenuItemOption>
                  <MenuItemOption
                    value='red'
                    onClick={() => editor.chain().focus().setColor('#F98181').run()}
                    className={editor.isActive('textStyle', { color: '#F98181' }) ? 'is-active' : ''}
                  >
                    <p><span style={{ color: '#F98181', fontWeight: 'bold' }}>A</span> Red</p>
                  </MenuItemOption>
                  <MenuItemOption
                    value='orange'
                    onClick={() => editor.chain().focus().setColor('#FBBC88').run()}
                    className={editor.isActive('textStyle', { color: '#FBBC88' }) ? 'is-active' : ''}
                  >
                    <p><span style={{ color: '#FBBC88', fontWeight: 'bold' }}>A</span> Orange</p>
                  </MenuItemOption>
                  <MenuItemOption
                    value='yellow'
                    onClick={() => editor.chain().focus().setColor('#FAF594').run()}
                    className={editor.isActive('textStyle', { color: '#FAF594' }) ? 'is-active' : ''}
                  >
                    <p><span style={{ color: '#FAF594', fontWeight: 'bold' }}>A</span> Yellow</p>
                  </MenuItemOption>
                  <MenuItemOption
                    value='blue'
                    onClick={() => editor.chain().focus().setColor('#70CFF8').run()}
                    className={editor.isActive('textStyle', { color: '#70CFF8' }) ? 'is-active' : ''}
                  >
                    <p><span style={{ color: '#70CFF8', fontWeight: 'bold' }}>A</span> Blue</p>
                  </MenuItemOption>
                  <MenuItemOption
                    value='teal'
                    onClick={() => editor.chain().focus().setColor('#94FADB').run()}
                    className={editor.isActive('textStyle', { color: '#94FADB' }) ? 'is-active' : ''}
                  >
                    <p><span style={{ color: '#94FADB', fontWeight: 'bold' }}>A</span> Teal</p>
                  </MenuItemOption>
                  <MenuItemOption
                    value='green'
                    onClick={() => editor.chain().focus().setColor('#B9F18D').run()}
                    className={editor.isActive('textStyle', { color: '#B9F18D' }) ? 'is-active' : ''}
                  >
                    <p><span style={{ color: '#B9F18D', fontWeight: 'bold' }}>A</span> Green</p>
                  </MenuItemOption>
              
            </MenuList>
          </Menu> 
      </BubbleMenu>}

      {editor && <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          size="xs"
        >
          H1
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          size="xs"
        >
          H2
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          size="xs"
        >
          BulletList
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
          size="xs"
        >
          CodeBlock
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive('taskList') ? 'is-active' : ''}
          size="xs"
        >
          TaskList
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          size="xs"
        >
          Blockquote
        </Button>
      </FloatingMenu>}
      {/* <MenuBar editor={editor} /> */}
      <EditorContent editor={editor} />
      <div className="character-count">
        {editor.storage.characterCount.characters()} characters
        <br />
        {editor.storage.characterCount.words()} words
      </div>
      {localStorage.getItem("chakra-ui-color-mode") === "light" ?
        <Tooltip label="Download as PDF">
          <Button colorScheme="orange" variant='outline' onClick={() => exportHtml()}><FaFilePdf /></Button>
        </Tooltip> : <></>}
    </div>
  )
}

export default NoteEditor