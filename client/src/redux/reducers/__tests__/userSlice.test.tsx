import reducer, { setUser } from '../userSlice';

describe('userSlice', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({ user: {} });
  });

  it('handles setUser', () => {
    const user = { name: 'Ayush', userId: '123', email: 'ayush@example.com' };
    const state = reducer({ user: {} }, setUser(user));
    expect(state.user).toEqual(user);
  });

  it('overwrites the previous user rather than merging', () => {
    const first = reducer({ user: {} }, setUser({ name: 'Ayush', balance: 1000 }));
    const second = reducer(first, setUser({ name: 'Ayush' }));
    expect(second.user).toEqual({ name: 'Ayush' });
    expect(second.user.balance).toBeUndefined();
  });
});
