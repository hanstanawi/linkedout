import { screen, render } from '@testing-library/react';
import { mockExperiencesListProps, mockUserIdProps } from 'test/mockTest';
import ExperiencesList from '../ExperiencesList';

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
