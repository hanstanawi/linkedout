import { expect, describe, it } from 'vitest';
import { formatBirthDateAsAge, formatDate } from './format.helpers';

describe('Test format helper functions', () => {
  it('formatBirthDateAsAge should return user age', () => {
    const age = formatBirthDateAsAge('1998-09-29T00:00:00.000Z');
    expect(age).toBe(24);
  });

  it('formatDate should return correct date format (Nov 2021)', () => {
    const age = formatDate('2021-11-11T00:00:00.000Z');
    expect(age).toBe('Nov 2021');
  });
});
