import { mount, shallow } from 'enzyme';
import { findByTestAttr, storeFactory } from '../test/testUtils';
import App from './App';
import { getSecretWord as mockGetSecretWord } from './actions';
import { Provider } from 'react-redux';

// activate global mock to make sure getSecretWord does not make network call
jest.mock('./actions');

const setup = () => {
  // useEffect() is not called with Shallow
  const store = storeFactory();
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent).toHaveLength(1);
});

describe('get secret word', () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear();
  });
  test('should return secret word on app mount', () => {
    const wrapper = setup();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  test('getSecretWord should not run on app update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // update app
    // wrapper.update() does not trigger useEffect
    wrapper.setProps();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
