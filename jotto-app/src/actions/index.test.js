import moxios from 'moxios';
import { getSecretWord } from './index';
import { storeFactory } from '../../test/testUtils';

describe('getSecretWord', () => {
  beforeEach(() => {
    // install moxios
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should return a secret word', () => {
    const store = storeFactory();
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: 'party',
      });
    });

    // update to test app in Redux

    return store.dispatch(getSecretWord()).then(() => {
      const secretWord = store.getState().secretWord;
      expect(secretWord).toBe('party');
    });
  });
});
