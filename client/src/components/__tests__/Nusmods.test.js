import { render, screen, cleanup } from "@testing-library/react"
import Nusmods from "../Nusmods"

afterEach(() => {
  cleanup();
})

test("Nusmods renders without crashing", () => {
  render(<Nusmods/>);
  const nusmodsElement = screen.queryByTitle("Nusmods")
  expect(nusmodsElement).toBeInTheDocument()
})