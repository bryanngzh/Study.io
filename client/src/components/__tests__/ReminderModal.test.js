import { render, screen, cleanup } from "@testing-library/react"
import ReminderModal from "../ReminderModal"

afterEach(() => {
  cleanup();
})

test("ReminderModal renders without crashing", () => {
  render(<ReminderModal/>);
  const reminderModalElement = screen.queryByTitle("ReminderModal")
  expect(reminderModalElement).toBeInTheDocument()
})