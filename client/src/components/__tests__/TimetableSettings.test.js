import { render, screen, cleanup } from "@testing-library/react"
import TimetableSettings from "../TimetableSettings"

afterEach(() => {
  cleanup();
})

test("Delete Note renders without crashing", () => {
  render(<TimetableSettings/>);
  const timetableSettingsElement = screen.queryByTitle("TimetableSettings")
  expect(timetableSettingsElement).toBeInTheDocument()
})