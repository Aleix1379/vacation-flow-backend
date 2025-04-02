import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../domain/employee.repository';
import { Employee } from '../domain/employee.entity';
import { CreateEmployeeDto } from '../infrastructure/dto/create-employee.dto';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(dto: CreateEmployeeDto): Promise<Employee> {
    try {
      const employee = Employee.create({
        name: dto.name,
        email: dto.email,
        department: dto.department,
      });

      return await this.employeeRepository.create(employee);
    } catch (error) {
      // Convert domain errors to application-specific errors
      throw new CreateEmployeeError(error.message);
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
