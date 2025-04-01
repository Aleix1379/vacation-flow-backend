export class Department {
  private readonly value: string;

  constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    const validDepartments = ['HR', 'Development', 'Marketing', 'Sales'];
    if (!validDepartments.includes(value)) {
      throw new Error(`Invalid department: ${value}`);
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Department): boolean {
    return this.value === other.getValue();
  }
}
