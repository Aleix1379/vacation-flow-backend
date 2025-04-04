import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmEmployeeRepository } from '../../../../src/contexts/employee/infrastructure/typeorm-employee.repository';
import {
  EmployeeSchema,
  TypeOrmEmployee,
} from '../../../../src/contexts/employee/infrastructure/typeorm-employee.schema';
import { Employee } from '../../../../src/contexts/employee/domain/employee.entity';

describe('TypeOrmEmployeeRepository', () => {
  let repository: TypeOrmEmployeeRepository;

  const mockOrmRepo = {
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmEmployeeRepository,
        {
          provide: getRepositoryToken(EmployeeSchema),
          useValue: mockOrmRepo,
        },
      ],
    }).compile();

    repository = module.get<TypeOrmEmployeeRepository>(
      TypeOrmEmployeeRepository,
    );
  });

  describe('create()', () => {
    it('should convert domain to persistence model correctly', async () => {
      const employee = Employee.create({
        name: 'John Doe',
        email: 'john@example.com',
        department: 'HR',
      });

      mockOrmRepo.save.mockResolvedValue({
        id: employee.getId().getValue(),
        name: 'John Doe',
        email: 'john@example.com',
        department: 'HR',
      });

      await repository.create(employee);

      expect(mockOrmRepo.save).toHaveBeenCalledWith({
        id: expect.any(String) as string,
        name: 'John Doe',
        email: 'john@example.com',
        department: 'HR',
      } as TypeOrmEmployee);
    });

    it('should return domain entity with saved data', async () => {
      const testData: TypeOrmEmployee = {
        // Explicitly typed
        id: '12345',
        name: 'John Doe',
        email: 'john@example.com',
        department: 'HR',
      };

      mockOrmRepo.save.mockResolvedValue(testData);

      const employee = await repository.create(
        Employee.create({
          name: 'John Doe',
          email: 'john@example.com',
          department: 'HR',
        }),
      );

      expect(employee.getId().getValue()).toBe(testData.id);
      expect(employee.getName().getValue()).toBe(testData.name);
    });

    it('should handle database errors', async () => {
      mockOrmRepo.save.mockRejectedValue(new Error('DB Error'));

      await expect(
        repository.create(
          Employee.create({
            name: 'John Doe',
            email: 'john@example.com',
            department: 'HR',
          }),
        ),
      ).rejects.toThrow('DB Error');
    });
  });
});
