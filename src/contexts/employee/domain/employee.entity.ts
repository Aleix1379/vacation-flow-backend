// src/contexts/employee/domain/employee.entity.ts
import { EmployeeId } from './value-objects/employee-id';
import { Name } from './value-objects/name';
import { Email } from './value-objects/email';
import { Department } from './value-objects/department';
import { TypeOrmEmployeeModel } from '../infrastructure/models/typeorm-employee.model';

export class Employee {
  private constructor(
    private readonly id: EmployeeId,
    private name: Name,
    private email: Email,
    private department: Department,
  ) {}

  public static create(props: {
    id?: string;
    name: string;
    email: string;
    department: string;
  }): Employee {
    return new Employee(
      props.id ? new EmployeeId(props.id) : new EmployeeId(),
      new Name(props.name),
      new Email(props.email),
      new Department(props.department),
    );
  }

  public static createFromPersistence(data: TypeOrmEmployeeModel): Employee {
    return new Employee(
      new EmployeeId(data.id),
      new Name(data.name),
      new Email(data.email),
      new Department(data.department),
    );
  }

  getId(): EmployeeId {
    return this.id;
  }

  getName(): Name {
    return this.name;
  }

  getEmail(): Email {
    return this.email;
  }

  getDepartment(): Department {
    return this.department;
  }

  changeName(newName: string): void {
    this.name = new Name(newName);
  }

  transferTo(newDepartment: string): void {
    this.department = new Department(newDepartment);
  }

  toJSON() {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      department: this.department.getValue(),
    };
  }
}
