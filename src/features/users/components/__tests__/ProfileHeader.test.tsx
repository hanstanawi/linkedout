import { render, screen } from '@testing-library/react';
import ProfileHeader from '../ProfileHeader';

const mockProfileProps = {
  id: 'f508f233-9cc0-4952-a4cd-3336b4f067c0',
  createdAt: '2022-10-02T06:55:47.386Z',
  updatedAt: '2022-10-04T13:22:57.872Z',
  firstName: 'Hans',
  lastName: 'Tanawi',
  birthDate: '1997-09-27T00:00:00.000Z',
  about: '',
  profileImage:
    'http://res.cloudinary.com/dbuvuwofy/image/upload/v1664865476/linkedout/ahgggrohhmvhw1lbtml0.jpg',
  workExperiences: [
    {
      id: '64f68eb1-2e22-4ab4-9511-f6c7a1060a78',
      jobTitle: 'Software Engineer',
      createdAt: '2022-10-02T07:13:25.473Z',
      updatedAt: '2022-10-04T12:43:26.774Z',
      startDate: '2021-11-15T00:00:00.000Z',
      endDate: null,
      isCurrent: true,
      companyName: 'Lumina',
      companyLogo:
        'http://res.cloudinary.com/dbuvuwofy/image/upload/v1664887402/linkedout/wof4v8alv7q1sx8iign8.jpg',
      jobDescription:
        'Write code, fix bug, deploy changes, implement new features, meeting and stuff',
      userId: 'f508f233-9cc0-4952-a4cd-3336b4f067c0',
    },
  ],
};

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
