// tests/components/Animations/FadeIn.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import FadeIn from '../../../src/components/Animations/FadeIn';

describe('FadeIn Component', () => {
  test('renders children with initial opacity of 0', () => {
    render(<FadeIn>Test Content</FadeIn>);
    const childElement = screen.getByText(/Test Content/i);
    expect(childElement).toHaveStyle('opacity: 0');
  });

  test('fades in children after the specified duration', async () => {
    render(<FadeIn duration={500}>Test Content</FadeIn>);
    const childElement = screen.getByText(/Test Content/i);
    expect(childElement).toHaveStyle('opacity: 0');

    setTimeout(() => {
      expect(childElement).toHaveStyle('opacity: 1');
    }, 500);
  });
});
