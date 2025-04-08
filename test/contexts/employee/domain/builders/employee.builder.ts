import { Employee } from '@employee/domain/employee.entity';

interface EmployeeData {
  id: string;
  name: string;
  email: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
}

export class EmployeeBuilder {
  private employee: EmployeeData = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  public build(): Employee {
    return {
      ...this.employee,
      getId: (): string => this.employee.id,
      getName: (): string => this.employee.name,
      getEmail: (): string => this.employee.email,
      getDepartment: (): string => this.employee.department,
      getCreatedAt: (): Date => this.employee.createdAt,
      getUpdatedAt: (): Date => this.employee.updatedAt,
      changeName: (_newName: string): void => {},
      transferTo: (_newDepartment: string): void => {},
      toJSON: (): Record<string, unknown> => ({
        id: this.employee.id,
        name: this.employee.name,
        email: this.employee.email,
        department: this.employee.department,
        createdAt: this.employee.createdAt,
        updatedAt: this.employee.updatedAt,
      }),
    } as unknown as Employee;
  }

  public withId(id: string): EmployeeBuilder {
    this.employee.id = id;
    return this;
  }

  public withName(name: string): EmployeeBuilder {
    this.employee.name = name;
    return this;
  }

  public withEmail(email: string): EmployeeBuilder {
    this.employee.email = email;
    return this;
  }

  public withDepartment(department: string): EmployeeBuilder {
    this.employee.department = department;
    return this;
  }

  public withCreatedAt(date: Date): EmployeeBuilder {
    this.employee.createdAt = date;
    return this;
  }

  public withUpdatedAt(date: Date): EmployeeBuilder {
    this.employee.updatedAt = date;
    return this;
  }
}
