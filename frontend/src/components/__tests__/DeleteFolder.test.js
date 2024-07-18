import { render, screen, cleanup } from "@testing-library/react"
import DeleteFolder from "../DeleteFolder"

afterEach(() => {
  cleanup();
})

test("Delete folder renders without crashing", () => {
  render(<DeleteFolder/>);
  const deletefolderElement = screen.queryByTitle("deletefolder")
  expect(deletefolderElement).toBeInTheDocument()
})