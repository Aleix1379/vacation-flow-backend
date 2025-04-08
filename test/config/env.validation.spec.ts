import { validateEnv } from '@app/config/env.validation';

describe('validateEnv', () => {
  beforeEach(() => {
    delete process.env.DB_PORT;
    delete process.env.DB_HOST;
    delete process.env.DB_USERNAME;
    delete process.env.DB_PASSWORD;
    delete process.env.DB_NAME;
  });

  it('should throw an error if DB_PORT is missing', () => {
    process.env.DB_HOST = 'localhost';
    process.env.DB_USERNAME = 'user';
    process.env.DB_PASSWORD = 'password';
    process.env.DB_NAME = 'database';

    expect(() => validateEnv()).toThrowError(
      'DB_PORT is not defined in the environment variables',
    );
  });

  it('should throw an error if DB_HOST is missing', () => {
    process.env.DB_PORT = '5432';
    process.env.DB_USERNAME = 'user';
    process.env.DB_PASSWORD = 'password';
    process.env.DB_NAME = 'database';

    expect(() => validateEnv()).toThrowError(
      'DB_HOST is not defined in the environment variables',
    );
  });

  it('should throw an error if DB_USERNAME is missing', () => {
    process.env.DB_PORT = '5432';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PASSWORD = 'password';
    process.env.DB_NAME = 'database';

    expect(() => validateEnv()).toThrowError(
      'DB_USERNAME is not defined in the environment variables',
    );
  });

  it('should throw an error if DB_PASSWORD is missing', () => {
    process.env.DB_PORT = '5432';
    process.env.DB_HOST = 'localhost';
    process.env.DB_USERNAME = 'user';
    process.env.DB_NAME = 'database';

    expect(() => validateEnv()).toThrowError(
      'DB_PASSWORD is not defined in the environment variables',
    );
  });

  it('should throw an error if DB_NAME is missing', () => {
    process.env.DB_PORT = '5432';
    process.env.DB_HOST = 'localhost';
    process.env.DB_USERNAME = 'user';
    process.env.DB_PASSWORD = 'password';

    expect(() => validateEnv()).toThrowError(
      'DB_NAME is not defined in the environment variables',
    );
  });

  it('should pass validation if all required variables are set correctly', () => {
    process.env.DB_PORT = '5432';
    process.env.DB_HOST = 'localhost';
    process.env.DB_USERNAME = 'user';
    process.env.DB_PASSWORD = 'password';
    process.env.DB_NAME = 'database';

    expect(() => validateEnv()).not.toThrow();
  });
});
