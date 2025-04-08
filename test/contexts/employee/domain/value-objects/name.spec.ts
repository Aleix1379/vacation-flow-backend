import { Name } from '@employee/domain/value-objects/name';

describe('Name', () => {
  it('should create a valid name', () => {
    const name = new Name('John Doe');
    expect(name.getValue()).toBe('John Doe');
  });

  it('should throw an error for empty or invalid names', () => {
    expect(() => new Name('')).toThrowError('Name cannot be empty');
    expect(() => new Name('   ')).toThrowError('Name cannot be empty');
  });
});
