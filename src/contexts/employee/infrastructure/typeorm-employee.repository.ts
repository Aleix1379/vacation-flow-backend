import { TypeOrmEmployeeModel } from './models/typeorm-employee.model';
import { EmployeeRepository } from '../domain/employee.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeSchema } from './typeorm-employee.schema';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employee } from '../domain/employee.entity';

@Injectable()
export class TypeOrmEmployeeRepository implements EmployeeRepository {
  constructor(
    @InjectRepository(EmployeeSchema)
    private readonly repository: Repository<TypeOrmEmployeeModel>,
  ) {}

  async create(employee: Employee): Promise<Employee> {
    const dbModel: TypeOrmEmployeeModel = {
      id: employee.getId().getValue(),
      name: employee.getName().getValue(),
      email: employee.getEmail().getValue(),
      department: employee.getDepartment().getValue(),
    };

    const saved = await this.repository.save(dbModel);
    return Employee.create(saved);
  }
}
