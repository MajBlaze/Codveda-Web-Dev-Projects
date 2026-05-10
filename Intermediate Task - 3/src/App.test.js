import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /react calculator app/i });
  expect(heading).toBeInTheDocument();
});
