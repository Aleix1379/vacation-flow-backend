export class Department {
  private readonly value: string;

  public static readonly VALID_DEPARTMENTS = {
    HR: 'HR',
    DEVELOPMENT: 'Development',
    MARKETING: 'Marketing',
    SALES: 'Sales',
    ENGINEERING: 'Engineering',
  } as const;

  constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (
      !Object.values(Department.VALID_DEPARTMENTS).includes(
        value as (typeof Department.VALID_DEPARTMENTS)[keyof typeof Department.VALID_DEPARTMENTS],
      )
    ) {
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
