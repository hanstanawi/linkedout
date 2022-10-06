import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Button from '../Button';

const mockOnClick = vi.fn();

describe('Button Component', () => {
  it('should render button component', () => {
    render(<Button onClick={mockOnClick}>Test Button</Button>);

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
  });
});
