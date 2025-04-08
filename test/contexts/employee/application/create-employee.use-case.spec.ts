import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateEmployeeError,
  CreateEmployeeUseCase,
} from '../../../../src/contexts/employee/application/create-employee.use-case';
import { CreateEmployeeDto } from '../../../../src/contexts/employee/infrastructure/dto/create-employee.dto';
import { Employee } from '../../../../src/contexts/employee/domain/employee.entity';
import { EMPLOYEE_REPOSITORY } from '../../../../src/contexts/employee/employee.constants';
import { EmployeeBuilder } from '../domain/builders/employee.builder';

describe('CreateEmployeeUseCase', () => {
  let useCase: CreateEmployeeUseCase;

  // Mock employee repository
  const mockEmployeeRepository = {
    create: jest.fn(),
  };

  // Valid employee data for tests
  const validEmployeeDto: CreateEmployeeDto = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
  };

  // Expected created employee
  const createdEmployee = new EmployeeBuilder()
    .withDepartment('Engineering')
    .build();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateEmployeeUseCase,
        {
          provide: EMPLOYEE_REPOSITORY,
          useValue: mockEmployeeRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateEmployeeUseCase>(CreateEmployeeUseCase);

    // Reset mocks before each test
    jest.clearAllMocks();

    // Setup default successful repository response
    mockEmployeeRepository.create.mockResolvedValue(createdEmployee);
  });

  describe('execute', () => {
    it('should successfully create an employee', async () => {
      // Setup Employee.create static method spy
      const createSpy = jest
        .spyOn(Employee, 'create')
        .mockReturnValue(createdEmployee);

      // Execute the use case
      const result = await useCase.execute(validEmployeeDto);

      // Verify Employee.create was called with correct params
      expect(createSpy).toHaveBeenCalledWith({
        name: validEmployeeDto.name,
        email: validEmployeeDto.email,
        department: validEmployeeDto.department,
      });

      // Verify repository.create was called
      expect(mockEmployeeRepository.create).toHaveBeenCalledWith(
        createdEmployee,
      );

      // Verify the result
      expect(result).toEqual(createdEmployee);
    });

    it('should throw CreateEmployeeError when Employee creation fails', async () => {
      // Mock Employee.create to throw an error
      const errorMessage = 'Invalid employee data';
      jest.spyOn(Employee, 'create').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      // Execute the use case and expect it to throw
      await expect(useCase.execute(validEmployeeDto)).rejects.toThrow(
        CreateEmployeeError,
      );

      // Verify the error message
      await expect(useCase.execute(validEmployeeDto)).rejects.toThrow(
        `[CreateEmployeeError]: ${errorMessage}`,
      );

      // Verify repository.create was not called
      expect(mockEmployeeRepository.create).not.toHaveBeenCalled();
    });

    it('should throw CreateEmployeeError when repository fails', async () => {
      // Setup Employee.create mock
      jest.spyOn(Employee, 'create').mockReturnValue(createdEmployee);

      // Setup repository.create to throw an error
      const repositoryError = 'Database connection error';
      mockEmployeeRepository.create.mockRejectedValue(
        new Error(repositoryError),
      );

      // Execute the use case and expect it to throw
      await expect(useCase.execute(validEmployeeDto)).rejects.toThrow(
        CreateEmployeeError,
      );

      // Verify the error message
      await expect(useCase.execute(validEmployeeDto)).rejects.toThrow(
        `[CreateEmployeeError]: ${repositoryError}`,
      );
    });

    it('should handle unknown errors correctly', async () => {
      // Setup Employee.create mock
      jest.spyOn(Employee, 'create').mockReturnValue(createdEmployee);

      // Setup repository.create to throw a non-Error value
      mockEmployeeRepository.create.mockRejectedValue(
        'Some non-error rejection',
      );

      // Execute the use case and expect it to throw with generic message
      await expect(useCase.execute(validEmployeeDto)).rejects.toThrow(
        '[CreateEmployeeError]: Unknown error occurred',
      );
    });
  });
});
