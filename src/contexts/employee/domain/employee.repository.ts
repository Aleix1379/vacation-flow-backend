import { Employee } from './employee.entity';

export interface EmployeeRepository {
  /**
   * Creates a new employee
   * @param employee The employee to create
   * @returns The created employee (potentially with additional generated fields like ID)
   */
  create(employee: Employee): Promise<Employee>;
}
