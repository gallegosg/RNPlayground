import React from 'react';
import Jest from '../src/Jest';

import renderer from 'react-test-renderer';

test('renders correctyl', () => {
  const jest = renderer.create(<Jest />).toJSON();
  expect(jest).toMatchSnapshot();
})