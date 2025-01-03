import { defineConfig } from "kysely-ctl"
import { db } from "./src/config/database"

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: "./src/database/migrations",
  },
  seeds: {
    seedFolder: "./src/database/seeds",
  },
})
