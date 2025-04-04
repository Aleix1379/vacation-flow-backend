import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../domain/employee.entity';
import { TypeOrmEmployee, EmployeeSchema } from './typeorm-employee.schema';
import { EmployeeRepository } from '../domain/employee.repository';
import { TypeOrmEmployeeModel } from './models/typeorm-employee.model';

@Injectable()
export class TypeOrmEmployeeRepository implements EmployeeRepository {
  constructor(
    @InjectRepository(EmployeeSchema)
    private readonly repository: Repository<TypeOrmEmployee>,
  ) {}

  async create(employee: Employee): Promise<Employee> {
    const dbModel: TypeOrmEmployeeModel = {
      id: employee.getId().getValue(),
      name: employee.getName().getValue(),
      department: employee.getDepartment().getValue(),
      email: employee.getEmail().getValue(),
    };

    const saved = await this.repository.save(dbModel);
    return Employee.create(saved);
  }
}
