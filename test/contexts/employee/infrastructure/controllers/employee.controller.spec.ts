import { Test } from '@nestjs/testing';
import { EmployeeController } from '../../../../../src/contexts/employee/infrastructure/controllers/employee.controller';
import {
  CreateEmployeeUseCase,
  CreateEmployeeError,
} from '../../../../../src/contexts/employee/application/create-employee.use-case';
import { Employee } from '../../../../../src/contexts/employee/domain/employee.entity';
import { Department } from '../../../../../src/contexts/employee/domain/value-objects/department';
import { CreateEmployeeDto } from '../../../../../src/contexts/employee/infrastructure/dto/create-employee.dto';

class MockCreateEmployeeUseCase {
  execute = jest.fn<Promise<Employee>, [CreateEmployeeDto]>();
}

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let mockCreateUseCase: MockCreateEmployeeUseCase;

  const createValidTestEmployee = (overrides?: Partial<CreateEmployeeDto>) => {
    const defaults = {
      name: 'John Smith',
      email: 'john.smith@example.com',
      department: Department.VALID_DEPARTMENTS.HR,
    };

    return Employee.create({
      ...defaults,
      ...overrides,
    });
  };

  beforeEach(async () => {
    mockCreateUseCase = new MockCreateEmployeeUseCase();

    const module = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: CreateEmployeeUseCase,
          useValue: mockCreateUseCase,
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  describe('POST /employees', () => {
    it('should successfully create an employee with valid HR department', async () => {
      const testEmployee = createValidTestEmployee();
      mockCreateUseCase.execute.mockResolvedValue(testEmployee);

      const validRequest: CreateEmployeeDto = {
        name: 'John Smith',
        email: 'john.smith@example.com',
        department: Department.VALID_DEPARTMENTS.HR,
      };

      const result = await controller.create(validRequest);

      expect(result).toEqual({
        id: expect.any(String) as string,
        name: 'John Smith',
        email: 'john.smith@example.com',
        department: Department.VALID_DEPARTMENTS.HR,
      });
    });

    it('should successfully create an employee with valid Engineering department', async () => {
      const testEmployee = createValidTestEmployee({
        department: Department.VALID_DEPARTMENTS.ENGINEERING,
      });
      mockCreateUseCase.execute.mockResolvedValue(testEmployee);

      const validRequest: CreateEmployeeDto = {
        name: 'Jane Engineer',
        email: 'jane@example.com',
        department: Department.VALID_DEPARTMENTS.ENGINEERING,
      };

      const result = await controller.create(validRequest);

      expect(result.department).toBe(Department.VALID_DEPARTMENTS.ENGINEERING);
    });

    it('should reject request with invalid department', async () => {
      const invalidRequest: CreateEmployeeDto = {
        name: 'Invalid Dept',
        email: 'test@example.com',
        department: 'Human Resources', // Not in VALID_DEPARTMENTS
      };

      mockCreateUseCase.execute.mockRejectedValue(
        new CreateEmployeeError('Invalid department'),
      );

      await expect(controller.create(invalidRequest)).rejects.toThrow(
        CreateEmployeeError,
      );
    });

    it('should reject request with invalid email format', async () => {
      const invalidRequest: CreateEmployeeDto = {
        name: 'Invalid Email',
        email: 'not-an-email',
        department: Department.VALID_DEPARTMENTS.HR,
      };

      mockCreateUseCase.execute.mockRejectedValue(
        new CreateEmployeeError('Invalid email format'),
      );

      await expect(controller.create(invalidRequest)).rejects.toThrow(
        CreateEmployeeError,
      );
    });

    it('should reject request with empty name', async () => {
      const invalidRequest: CreateEmployeeDto = {
        name: '',
        email: 'test@example.com',
        department: Department.VALID_DEPARTMENTS.HR,
      };

      mockCreateUseCase.execute.mockRejectedValue(
        new CreateEmployeeError('Name cannot be empty'),
      );

      await expect(controller.create(invalidRequest)).rejects.toThrow(
        CreateEmployeeError,
      );
    });

    it('should properly format error messages', async () => {
      const invalidRequest: CreateEmployeeDto = {
        name: 'Test',
        email: 'invalid-email',
        department: Department.VALID_DEPARTMENTS.HR,
      };

      mockCreateUseCase.execute.mockRejectedValue(
        new CreateEmployeeError('Invalid email format'),
      );

      await expect(controller.create(invalidRequest)).rejects.toThrow(
        '[CreateEmployeeError]',
      );
    });

    it('should handle unexpected errors', async () => {
      const validRequest: CreateEmployeeDto = {
        name: 'Test',
        email: 'test@example.com',
        department: Department.VALID_DEPARTMENTS.HR,
      };

      mockCreateUseCase.execute.mockRejectedValue(
        new CreateEmployeeError('DB Connection Failed'),
      );

      await expect(controller.create(validRequest)).rejects.toThrow(
        '[CreateEmployeeError]: DB Connection Failed',
      );
    });
  });
});
