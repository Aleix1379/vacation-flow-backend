import { EntitySchema } from 'typeorm';
import { Employee } from '../domain/employee.entity';

export interface TypeOrmEmployee {
  id: string;
  name: string;
  email: string;
  department: string;
}

export const EmployeeSchema = new EntitySchema<TypeOrmEmployee>({
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
