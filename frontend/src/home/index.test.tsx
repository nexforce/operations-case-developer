import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '.';

test('renders page data', () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/PRODUTOS/i);
  expect(linkElement).toBeInTheDocument();
});
