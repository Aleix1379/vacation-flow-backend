import { Employee } from '@employee/domain/employee.entity';
import { EmployeeId } from '@employee/domain/value-objects/employee-id';

describe('Employee', () => {
  const validProps = {
    name: 'John Doe',
    email: 'john@example.com',
    department: 'HR',
  };

  it('should create a valid employee', () => {
    const employee = Employee.create(validProps);

    expect(employee).toBeDefined();
    expect(employee.getId()).toBeInstanceOf(EmployeeId);
    expect(employee.getEmail().getValue()).toBe('john@example.com');
  });

  it('should throw an error if any value object is invalid', () => {
    expect(() => {
      Employee.create({ ...validProps, email: 'invalid-email' });
    }).toThrowError('Invalid email format');
  });

  it('should return the correct properties', () => {
    const employee = Employee.create({ ...validProps, id: '12345' });

    expect(employee.getId().getValue()).toBe('12345');
    expect(employee.getEmail().getValue()).toBe('john@example.com');
    expect(employee.getDepartment().getValue()).toBe('HR');
  });

  describe('Business Methods', () => {
    let employee: Employee;

    beforeEach(() => {
      employee = Employee.create(validProps);
    });

    it('should change name correctly', () => {
      employee.changeName('Jane Smith');
      expect(employee.getName().getValue()).toBe('Jane Smith');
    });

    it('should transfer department correctly', () => {
      employee.transferTo('Engineering');
      expect(employee.getDepartment().getValue()).toBe('Engineering');
    });
  });
});
