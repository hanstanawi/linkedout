import { expect, describe, it } from 'vitest';
import { formatBirthDateAsAge } from './format.helpers';

describe('Test format helper functions', () => {
  it('formatBirthDateAsAge should return user age', () => {
    const age = formatBirthDateAsAge('1998-09-29T00:00:00.000Z');
    expect(age).toBe(24);
  });
});
