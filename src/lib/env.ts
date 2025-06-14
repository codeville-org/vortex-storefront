/* eslint-disable @typescript-eslint/no-namespace */
// env.ts
import { z } from "zod";

// Define the schema as an object with all of the env
// variables and their types
const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  MEDUSA_BACKEND_URL: z.string().url(),
  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: z.string()
});

// Validate `process.env` against our schema
// and return the result
const env = envSchema.parse(process.env);

export type Environment = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

// Export the result so we can use it in the project
export default env;
