import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z
    .enum(["test", "development", "production", "hmg"])
    .default("development"),
  APP_PORT: z.coerce.number().default(8000),
  // TEST_APP_PORT: z.coerce.number().default(8001),
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error("⚠️ Invalid environment variables", _env.error.format())

  throw new Error("Invalid environment variables.")
}

export const env = _env.data
