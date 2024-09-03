import { existsSync, readFileSync } from 'fs';

/**
 * Loads the appropriate environment variables for an event.
 */
const envLoader = () => {
  const env = process.env.npm_lifecycle_event || 'dev';
  const path = env.includes('test') || env.includes('cover') ? '.env.test': '.env';

  if (existsSync(path)) {
    const data = readFileSync(path, 'utf-8').trim().split('\n');

    for (const line of data) {
      const delimposition = line.indexOf('=');
      const variable = line.substring(0, delimposition);
      const value = line.substring(delimposition + 1);
      process.env[variable] = value;
    }
  }
};

export default envLoader;
