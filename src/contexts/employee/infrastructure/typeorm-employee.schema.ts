import { EntitySchema } from 'typeorm';
import { Employee } from '../domain/employee.entity';

export interface TypeOrmEmployeeModel {
  id: string;
  name: string;
  email: string;
  department: string;
}

export const EmployeeSchema = new EntitySchema<TypeOrmEmployeeModel>({
  name: 'Employee',
  target: Employee,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    name: {
      type: 'varchar',
      length: 255,
    },
    email: {
      type: 'varchar',
      length: 255,
      unique: true,
    },
    department: {
      type: 'varchar',
      length: 100,
    },
  },
});

export type EmployeeSchemaType = typeof EmployeeSchema;
