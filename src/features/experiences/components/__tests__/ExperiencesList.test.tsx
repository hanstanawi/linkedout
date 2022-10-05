import { screen, render } from '@testing-library/react';
import ExperiencesList from '../ExperiencesList';

const mockExperiencesListProps = [
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
];

const mockUserIdProps = 'f508f233-9cc0-4952-a4cd-3336b4f067c0';

describe('ExperiencesList Component', () => {
  beforeEach(() => {
    render(
      <ExperiencesList
        userId={mockUserIdProps}
        experiences={mockExperiencesListProps}
      />
    );
  });

  it('should render Experience text', () => {
    const headerText = screen.getByRole('heading', {
      level: 4,
      name: 'Experience',
    });
    expect(headerText).toBeInTheDocument();
  });

  it('should render Add Experience button', () => {
    const addExperienceBtn = screen.getByRole('button', {
      name: 'Add Experience',
    });
    expect(addExperienceBtn).toBeInTheDocument();
  });

  it('should render 2 experiences', () => {
    const experiencesList = screen.queryAllByRole('listitem');
    expect(experiencesList).toHaveLength(2);
  });
});
