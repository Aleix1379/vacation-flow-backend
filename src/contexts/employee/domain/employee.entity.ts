import { EmployeeId } from './value-objects/employee-id';
import { Name } from './value-objects/name';
import { Email } from './value-objects/email';
import { Department } from './value-objects/department';

export class Employee {
  constructor(
    private readonly id: EmployeeId,
    private name: Name,
    private email: Email,
    private department: Department,
  ) {}

  getId(): EmployeeId {
    return this.id;
  }

  getEmail(): Email {
    return this.email;
  }

  getDepartment(): Department {
    return this.department;
  }
}
