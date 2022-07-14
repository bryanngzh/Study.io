import { render, screen, cleanup } from "@testing-library/react"
import DeleteNote from "../DeleteNote"

afterEach(() => {
  cleanup();
})

test("Delete Note renders without crashing", () => {
  render(<DeleteNote/>);
  const deleteNoteElement = screen.queryByTitle("deleteNote")
  expect(deleteNoteElement).toBeInTheDocument()
})