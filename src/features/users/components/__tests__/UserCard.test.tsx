import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { mockUserProps } from 'test/mockTest';
import UserCard from '../UserCard';

const MockUserCard = (
  <BrowserRouter>
    <UserCard user={mockUserProps} />
  </BrowserRouter>
);

describe('UserCard Component', () => {
  beforeEach(() => {
    render(MockUserCard);
  });

  it('Should show user name', () => {
    const nameHeader = screen.getByRole('heading', {
      level: 3,
      name: 'Hans Tanawi',
    });
    expect(nameHeader).toBeInTheDocument();
  });

  it('Should show user current title', () => {
    const titleDiv = screen.getByText(/Software Engineer at Lumina/i);
    expect(titleDiv).toBeInTheDocument();
  });

  it('Should show view profile link', () => {
    const viewProfileLink = screen.getByRole('link', { name: 'View Profile' });
    expect(viewProfileLink).toBeInTheDocument();
  });
});
