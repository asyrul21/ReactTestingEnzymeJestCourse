import moxios from 'moxios';
import { getSecretWord } from './index';

describe('getSecretWord', () => {
  beforeEach(() => {
    // install moxios
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should return a secret word', () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: 'party',
      });
    });

    // update to test app in Redux
    return getSecretWord().then((secretWord) => {
      expect(secretWord).toBe('party');
    });
  });
});
