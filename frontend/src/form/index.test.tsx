import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '.';
// import App from './index';

test('renders form', () => {
  render(<App />);
  const linkElement = screen.getByText(/Cadastrar produto/i);
  expect(linkElement).toBeInTheDocument();
});
