import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSchema } from './infrastructure/typeorm-employee.schema';
import { EmployeeController } from './infrastructure/controllers/employee.controller';
import { TypeOrmEmployeeRepository } from './infrastructure/typeorm-employee.repository';
import { CreateEmployeeUseCase } from './application/create-employee.use-case';

export const EMPLOYEE_REPOSITORY = 'EMPLOYEE_REPOSITORY';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeSchema])],
  controllers: [EmployeeController],
  providers: [
    {
      provide: EMPLOYEE_REPOSITORY,
      useClass: TypeOrmEmployeeRepository,
    },
    CreateEmployeeUseCase,
  ],
  exports: [EMPLOYEE_REPOSITORY, CreateEmployeeUseCase],
})
export class EmployeeModule {}
