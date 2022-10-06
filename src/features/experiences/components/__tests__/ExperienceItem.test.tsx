import { render, screen } from '@testing-library/react';
import { mockExperienceProps, mockUserIdProps } from 'test/mockTest';
import ExperienceItem from '../ExperienceItem';

describe('ExperienceItem Component', () => {
  beforeEach(() => {
    render(
      <ExperienceItem
        userId={mockUserIdProps}
        experience={mockExperienceProps}
      />
    );
  });

  it('should render job title', () => {
    const titleHeader = screen.getByRole('heading', {
      level: 3,
      name: 'Software Engineer',
    });
    expect(titleHeader).toBeInTheDocument();
  });

  it('should render company name', () => {
    const titleHeader = screen.getByRole('heading', {
      level: 4,
      name: 'Lumina',
    });
    expect(titleHeader).toBeInTheDocument();
  });

  it('should render work period', () => {
    const workPeriod = screen.getByText(/Nov 2021 - Current/);
    expect(workPeriod).toBeInTheDocument();
  });

  it('should render job description', () => {
    const workPeriod = screen.getByText(
      /Write code, fix bug, deploy changes, implement new features, meeting and stuff/
    );
    expect(workPeriod).toBeInTheDocument();
  });
});
