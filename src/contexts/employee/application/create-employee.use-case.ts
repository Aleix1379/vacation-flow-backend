import { Injectable, Inject } from '@nestjs/common';
import { EmployeeRepository } from '../domain/employee.repository';
import { Employee } from '../domain/employee.entity';
import { CreateEmployeeDto } from '../infrastructure/dto/create-employee.dto';
import { EMPLOYEE_REPOSITORY } from '../employee.constants';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async execute(dto: CreateEmployeeDto): Promise<Employee> {
    try {
      const employee = Employee.create({
        name: dto.name,
        email: dto.email,
        department: dto.department,
      });

      return await this.employeeRepository.create(employee);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      throw new CreateEmployeeError(errorMessage);
    }
  }
}

// Custom error class
export class CreateEmployeeError extends Error {
  constructor(message: string) {
    super(`[CreateEmployeeError]: ${message}`);
    this.name = 'CreateEmployeeError';
  }
}
