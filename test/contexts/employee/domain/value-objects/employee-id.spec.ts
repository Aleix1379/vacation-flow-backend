import { EmployeeId } from '@employee/domain/value-objects/employee-id';

describe('EmployeeId', () => {
  it('should generate a unique ID if none is provided', () => {
    const id1 = new EmployeeId();
    const id2 = new EmployeeId();
    expect(id1.getValue()).not.toBe(id2.getValue());
  });

  it('should accept a predefined ID', () => {
    const predefinedId = '12345';
    const id = new EmployeeId(predefinedId);
    expect(id.getValue()).toBe(predefinedId);
  });
});
