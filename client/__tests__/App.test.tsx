/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  jest.useFakeTimers();

  let root: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    root = ReactTestRenderer.create(<App />);
  });
  await ReactTestRenderer.act(() => {
    root!.unmount();
  });

  jest.useRealTimers();
});
