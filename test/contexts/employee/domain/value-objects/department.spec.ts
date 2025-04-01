import { Department } from '../../../../../src/contexts/employee/domain/value-objects/department';

describe('Department', () => {
  it('should create a valid department', () => {
    const department = new Department('HR');
    expect(department.getValue()).toBe('HR');
  });

  it('should throw an error for invalid departments', () => {
    expect(() => new Department('InvalidDept')).toThrowError(
      'Invalid department: InvalidDept',
    );
  });
});
