import { render, screen, cleanup } from "@testing-library/react"
import NoteEditor from "../NoteEditor"

afterEach(() => {
  cleanup();
})

test("Note Editor renders without crashing", () => {
  render(<NoteEditor/>);
  const noteeditorElement = screen.queryByTitle("noteeditor")
  expect(noteeditorElement).toBeInTheDocument()
})