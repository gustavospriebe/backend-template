import { beforeAll, afterAll } from 'vitest'
import { db } from '../src/config/database'

beforeAll(async () => {
  // Setup test database if needed
})

afterAll(async () => {
  await db.destroy()
})