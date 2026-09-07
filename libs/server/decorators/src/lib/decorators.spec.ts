import { decorators } from './decorators';

describe('decorators', () => {
  it('returns the library marker string', () => {
    expect(decorators()).toBe('decorators');
  });
});
