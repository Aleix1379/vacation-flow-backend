export function validateEnv() {
  if (!process.env.DB_PORT) {
    throw new Error('DB_PORT is not defined in the environment variables');
  }
  if (!process.env.DB_HOST) {
    throw new Error('DB_HOST is not defined in the environment variables');
  }
  if (!process.env.DB_USERNAME) {
    throw new Error('DB_USERNAME is not defined in the environment variables');
  }
  if (!process.env.DB_PASSWORD) {
    throw new Error('DB_PASSWORD is not defined in the environment variables');
  }
  if (!process.env.DB_NAME) {
    throw new Error('DB_NAME is not defined in the environment variables');
  }
}
