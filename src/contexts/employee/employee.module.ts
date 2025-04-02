import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSchema } from './infrastructure/typeorm-employee.schema';
import { TypeOrmEmployeeRepository } from './infrastructure/typeorm-employee.repository';
import { CreateEmployeeUseCase } from './application/create-employee.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeSchema])],
  providers: [
    {
      provide: 'EmployeeRepository',
      useClass: TypeOrmEmployeeRepository,
    },
    CreateEmployeeUseCase,
  ],
  exports: [CreateEmployeeUseCase],
})
export class EmployeeModule {}
