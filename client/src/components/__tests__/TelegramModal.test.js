import { render, screen, cleanup } from "@testing-library/react"
import TelegramModal from "../TelegramModal"

afterEach(() => {
  cleanup();
})

test("Telegram Modal renders without crashing", () => {
  render(<TelegramModal/>);
  const TelegramModalElement = screen.queryByTitle("TelegramModal")
  expect(TelegramModalElement).toBeInTheDocument()
})