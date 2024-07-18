import { render, screen, cleanup } from "@testing-library/react"
import Timetable from "../Timetable"

afterEach(() => {
  cleanup();
})

test("Timetable renders without crashing", () => {

  render(<Timetable />);
  const timetableElement = screen.queryByTitle("timetable")
  expect(timetableElement).toBeInTheDocument()
  expect(timetableElement).toHaveTextContent("NUSMODS")
})