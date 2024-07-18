import { render, screen, cleanup } from "@testing-library/react"
import Reminder from "../Reminder"

afterEach(() => {
  cleanup();
})

test("Reminder system renders without crashing", () => {
  render(<Reminder/>);
  const reminderElement = screen.queryByTitle("reminder")
  expect(reminderElement).toBeInTheDocument()
  expect(reminderElement).toHaveTextContent("Upcoming Events")
})