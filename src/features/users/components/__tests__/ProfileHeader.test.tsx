import { render, screen } from '@testing-library/react';
import { mockProfileProps } from 'test/mockTest';
import ProfileHeader from '../ProfileHeader';

describe('ProfileHeader Component', () => {
  beforeEach(() => {
    render(<ProfileHeader user={mockProfileProps} />);
  });

  it('should show user name on profile', () => {
    const nameHeader = screen.getByRole('heading', { level: 2 });
    expect(nameHeader).toBeInTheDocument();
    const nameContent = screen.getByText(/Hans Tanawi/i);
    expect(nameContent).toBeInTheDocument();
  });

  it('should show user image', () => {
    const userImage = screen.getByRole('img');
    expect(userImage).toBeInTheDocument();
  });

  it('should show user age correctly', () => {
    const userAge = screen.getByText(/25/i);
    expect(userAge).toBeInTheDocument();
  });

  it('should show user current position', () => {
    const userPosition = screen.getByText(/Software Engineer at Lumina/i);
    expect(userPosition).toBeInTheDocument();
  });

  it('should show edit profile button', () => {
    const editProfileBtn = screen.getByRole('button', { name: 'Edit Profile' });
    expect(editProfileBtn).toBeInTheDocument();
  });
});
