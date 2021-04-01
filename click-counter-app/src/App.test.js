import App from './App';

import Enzyme, { shallow, ShallowWrapper } from "enzyme"
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17"
Enzyme.configure({adapter: new EnzymeAdapter()})

/**
 * Factory function to create ShallowWraper for the App Component
 * @function setup
 * @returns {ShallowWrapper}
 */

const setup = () => shallow(<App />)

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)

test("renders without error", () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
})

test("renders increment button", () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})

test("renders counter display", () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, "counter-display")
  expect(counterDisplay.length).toBe(1)
})

test("counter display starts at 0", () => {
  const wrapper = setup()
  const initialCount = findByTestAttr(wrapper, "count").text() // stores text // .text() returns string
  expect(initialCount).toBe("0")
})

test("click button increments counter", () => {
  // tests the display, not state
  const wrapper = setup()

  // find button
  const button = findByTestAttr(wrapper, 'increment-button')

  // click the button
  button.simulate('click')

  // find the count span
  const countValue = findByTestAttr(wrapper, "count").text()

  // check value
  expect(countValue).toBe("1")
})
