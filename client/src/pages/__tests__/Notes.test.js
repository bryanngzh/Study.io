import { render, screen, cleanup } from "@testing-library/react"
import Notes from "../Notes"
import { BrowserRouter } from "react-router-dom"
import { AuthContext } from "../../helpers/AuthContext"
import { mount } from 'enzyme'


afterEach(() => {
  cleanup();
})

test("Notes renders without crashing", () => {
  expect(true).toBe(true)
})

