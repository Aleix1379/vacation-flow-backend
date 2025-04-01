import { v4 as uuidv4 } from 'uuid';

export class EmployeeId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value || uuidv4();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: EmployeeId): boolean {
    return this.value === other.getValue();
  }
}
