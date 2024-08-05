// tests/components/Animations/SlideUp.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import SlideUp from '../../../src/components/Animations/SlideUp';

describe('SlideUp Component', () => {
  test('renders children with initial transform offset', () => {
    render(<SlideUp initialOffset="50%">Test Content</SlideUp>);
    const childElement = screen.getByText(/Test Content/i);
    expect(childElement).toHaveStyle('transform: translateY(50%)');
  });

  test('slides up children after the specified duration', async () => {
    render(<SlideUp duration={500} initialOffset="100%">Test Content</SlideUp>);
    const childElement = screen.getByText(/Test Content/i);
    expect(childElement).toHaveStyle('transform: translateY(100%)');

    setTimeout(() => {
      expect(childElement).toHaveStyle('transform: translateY(0)');
    }, 500);
  });
});
