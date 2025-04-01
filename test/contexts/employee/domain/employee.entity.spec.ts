import { Employee } from '../../../../src/contexts/employee/domain/employee.entity';
import { EmployeeId } from '../../../../src/contexts/employee/domain/value-objects/employee-id';
import { Name } from '../../../../src/contexts/employee/domain/value-objects/name';
import { Email } from '../../../../src/contexts/employee/domain/value-objects/email';
import { Department } from '../../../../src/contexts/employee/domain/value-objects/department';

describe('Employee', () => {
  const validId = new EmployeeId('12345');
  const validName = new Name('John Doe');
  const validEmail = new Email('john@example.com');
  const validDepartment = new Department('HR');

  it('should create a valid employee', () => {
    const employee = new Employee(
      validId,
      validName,
      validEmail,
      validDepartment,
    );

    expect(employee).toBeDefined();
    expect(employee.getId()).toBe(validId);
    expect(employee.getEmail()).toBe(validEmail);
  });

  it('should throw an error if any value object is invalid', () => {
    const invalidEmail = () => new Email('invalid-email');

    expect(() => {
      new Employee(validId, validName, invalidEmail(), validDepartment);
    }).toThrowError('Invalid email format');
  });

  it('should return the correct ID and Email', () => {
    const employee = new Employee(
      validId,
      validName,
      validEmail,
      validDepartment,
    );

    expect(employee.getId().getValue()).toBe('12345');
    expect(employee.getEmail().getValue()).toBe('john@example.com');
  });

  // New test for getDepartment method
  it('should return the correct Department', () => {
    const employee = new Employee(
      validId,
      validName,
      validEmail,
      validDepartment,
    );

    expect(employee.getDepartment()).toBe(validDepartment);
    expect(employee.getDepartment().getValue()).toBe('HR');
  });
});
