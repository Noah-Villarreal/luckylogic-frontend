<<<<<<< HEAD
<<<<<<< HEAD
// src/App.test.js
test('App loads without crashing', () => {
  expect(true).toBe(true);
=======
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
>>>>>>> 9f40d55 (Initialize project using Create React App)
=======
// src/App.test.js
test('App loads without crashing', () => {
  expect(true).toBe(true);
>>>>>>> b966f9e (Added pick animation and updated styling)
});
