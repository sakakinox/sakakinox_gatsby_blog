import React from 'react';
import { render, screen, fireEvent } from 'gatsby-plugin-testing';
import Roulette from '../src/pages/app/roulette';

describe('Roulette', () => {
  it('starts spinning when Spin button is clicked', () => {
    render(<Roulette />);
    const input = screen.getByLabelText(/Input items/);
    fireEvent.change(input, { target: { value: 'Apple\nBanana\nCherry\n' } });
    const spinButton = screen.getByRole('button', { name: /Spin/ });
    fireEvent.click(spinButton);
    expect(screen.getByText(/Please input some items to spin!/)).toBeInTheDocument();
  });

  it('cannot start spinning when the list is empty', () => {
    render(<Roulette />);
    const spinButton = screen.getByRole('button', { name: /Spin/ });
    fireEvent.click(spinButton);
    expect(screen.getByText(/Please input some items to spin!/)).toBeInTheDocument();
  });

  it('shuffles the list when Shuffle button is clicked', () => {
    render(<Roulette />);
    const input = screen.getByLabelText(/Input items/);
    fireEvent.change(input, { target: { value: 'Apple\nBanana\nCherry\n' } });
    const shuffleButton = screen.getByRole('button', { name: /Shuffle/ });
    fireEvent.click(shuffleButton);
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).not.toEqual(['Apple', 'Banana', 'Cherry']);
  });

  it('can handle two-byte characters in the list', () => {
    render(<Roulette />);
    const input = screen.getByLabelText(/Input items/);
    fireEvent.change(input, { target: { value: 'りんご\nバナナ\nさくらんぼ\n' } });
    const shuffleButton = screen.getByRole('button', { name: /Shuffle/ });
    fireEvent.click(shuffleButton);
    const spinButton = screen.getByRole('button', { name: /Spin/ });
    fireEvent.click(spinButton);
    expect(screen.getByText(/Please input some items to spin!/)).toBeInTheDocument();
  });

  it('saves the list to cookie when Shuffle button is clicked', () => {
    render(<Roulette />);
    const input = screen.getByLabelText(/Input items/);
    fireEvent.change(input, { target: { value: 'Apple\nBanana\nCherry\n' } });
    const shuffleButton = screen.getByRole('button', { name: /Shuffle/ });
    fireEvent.click(shuffleButton);
    expect(document.cookie).toContain('rouletteItems=Apple,Banana,Cherry');
  });

  it('loads the list from cookie when there is data', () => {
    document.cookie = 'rouletteItems=Apple,Banana,Cherry; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    render(<Roulette />);
    expect(screen.getByLabelText(/Input items/)).toHaveValue('Apple\nBanana\nCherry\n');
  });

  it('deletes cookie data after one month', () => {
    const now = new Date();
    const expires = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    document.cookie = `rouletteItems=Apple,Banana,Cherry; expires=${expires.toUTCString()}`;
    render(<Roulette />);
    expect(document.cookie).not.toContain('rouletteItems=Apple,Banana,Cherry');
  });
});
