import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserCard from '../UserCard';

const mockUserProps = {
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
    {
      id: '2d4a212a-88af-4677-92c1-e86c3e473206',
      jobTitle: 'Frontend Engineer',
      createdAt: '2022-10-02T07:36:03.571Z',
      updatedAt: '2022-10-04T12:44:05.890Z',
      startDate: '2020-05-30T00:00:00.000Z',
      endDate: '2021-11-15T00:00:00.000Z',
      isCurrent: false,
      companyName: 'Molteo',
      companyLogo:
        'http://res.cloudinary.com/dbuvuwofy/image/upload/v1664887443/linkedout/ax2zkanxszg7adrqtenj.jpg',
      jobDescription: '',
      userId: 'f508f233-9cc0-4952-a4cd-3336b4f067c0',
    },
  ],
};

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
    const nameHeader = screen.getByRole('heading', { level: 3 });
    expect(nameHeader).toBeInTheDocument();

    const nameContent = screen.getByText(/Hans Tanawi/i);
    expect(nameContent).toBeInTheDocument();
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
