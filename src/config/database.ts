import { Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"
// import { DB } from '../types/database'

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: process.env.NODE_ENV === "development" ? false : true,
    },
    max: 10,
  }),
})

// put the type of the database on Kysely<db>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = new Kysely<any>({
  dialect,
})
