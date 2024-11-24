import { afterAll, beforeAll, beforeEach } from "vitest"
import { app } from "../src/app"
import { db } from "../src/config/database"

beforeAll(async () => {
  await app.ready()
})

beforeEach(async () => {
  // Clean up database tables before each test
  // Add your table truncate commands here if needed
  // Example: await db.truncate('users')
})

afterAll(async () => {
  await app.close()
  await db.destroy()
})
