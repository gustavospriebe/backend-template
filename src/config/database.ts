import { Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"
import { DB } from "../database/db"

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized:
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "test"
          ? false
          : true,
    },
    max: 10,
  }),
})

export const db = new Kysely<DB>({
  dialect,
})
