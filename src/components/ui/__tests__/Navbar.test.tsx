import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

const MockNavbar = (
  <BrowserRouter>
    <Navbar />
  </BrowserRouter>
);

describe('Navbar Component', () => {
  it('should render App name', () => {
    render(MockNavbar);

    const appTitle = screen.getByRole('heading', {
      level: 1,
      name: 'LinkedOut',
    });
    expect(appTitle).toBeInTheDocument();
  });
});
