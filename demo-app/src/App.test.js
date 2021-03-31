import { render, screen } from '@testing-library/react';
import App from './App';

// enzyme setup
import Enzyme, { shallow } from "enzyme"
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17"
Enzyme.configure({ adapter: new EnzymeAdapter()})


test('renders non-empty component without crashing', () => {
  const wrapper = shallow(<App />)
  // console.log(wrapper.debug());

  // assert
  expect(wrapper.exists()).toBe(true)
});
