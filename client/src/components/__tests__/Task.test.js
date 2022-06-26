import { render, screen, cleanup } from "@testing-library/react"
import Task from "../Task"

afterEach(() => {
  cleanup();
})

test("Taskbar renders without crashing", () => {
  render(<Task />);
  const taskbarElement = screen.queryByTitle("taskbar")
  expect(taskbarElement).toBeInTheDocument()
  expect(taskbarElement).toHaveTextContent("Tasks")
})