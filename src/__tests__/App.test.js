import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  localStorage.clear();
});

test('renders LuckyLogic title', () => {
  render(<App />);
  expect(screen.getByText('LuckyLogic')).toBeInTheDocument();
});

test('generates picks when button is clicked', async () => {
  render(<App />);
  const button = screen.getByText(/Generate Pick/i);
  fireEvent.click(button);

  await waitFor(() => {
    const balls = screen.getAllByText((text) => /^\d+$/.test(text));
    expect(balls.length).toBeGreaterThanOrEqual(6);
  }, { timeout: 1500 });
});

test('saves generated pick to history', async () => {
  render(<App />);
  const button = screen.getByText(/Generate Pick/i);
  fireEvent.click(button);

  await waitFor(() => {
    const historyItems = screen.getAllByText((text) => /^\d+/.test(text));
    expect(historyItems.length).toBeGreaterThan(0);
  }, { timeout: 1500 });
});

test('allows favoriting a pick', async () => {
  render(<App />);
  const button = screen.getByText(/Generate Pick/i);
  fireEvent.click(button);

  await waitFor(() => {
    const heart = screen.getAllByText('❤️');
    expect(heart.length).toBeGreaterThan(0);
    fireEvent.click(heart[0]);
  }, { timeout: 1500 });

  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  expect(favorites.length).toBeGreaterThan(0);
});

