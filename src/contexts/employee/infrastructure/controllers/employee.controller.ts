import { Controller, Post, Body } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeeResponseDto } from '../dto/employee.response.dto';
import { CreateEmployeeUseCase } from '../../application/create-employee.use-case';
import { Employee } from '../../domain/employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly createUseCase: CreateEmployeeUseCase) {}

  @Post()
  async create(@Body() dto: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    const employee = await this.createUseCase.execute(dto);
    return this.toResponseDto(employee);
  }

  private toResponseDto(employee: Employee): EmployeeResponseDto {
    return {
      id: employee.getId().getValue(),
      name: employee.getName().getValue(),
      email: employee.getEmail().getValue(),
      department: employee.getDepartment().getValue(),
    };
  }
}
