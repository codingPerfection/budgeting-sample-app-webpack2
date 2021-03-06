import React from 'react';
import renderer from 'react-test-renderer';
import { Budget } from 'components/Budget';

// mock nested components

jest.mock('containers/BudgetOverview', () => 'div');
jest.mock('react-router-dom');
it('renders correctly', () => {
  const mockupMatch = {
    url: '/hello/',
  };

  const tree = renderer.create(<Budget match={mockupMatch} />).toJSON();
  expect(tree).toMatchSnapshot();
});
