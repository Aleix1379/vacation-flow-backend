import { Email } from '../../../../../src/contexts/employee/domain/value-objects/email';

describe('Email', () => {
  it('should create a valid email', () => {
    const email = new Email('test@example.com');
    expect(email.getValue()).toBe('test@example.com');
  });

  it('should throw an error for invalid email formats', () => {
    expect(() => new Email('invalid-email')).toThrowError(
      'Invalid email format',
    );
    expect(() => new Email('test@')).toThrowError('Invalid email format');
    expect(() => new Email('testexample.com')).toThrowError(
      'Invalid email format',
    );
  });
});
