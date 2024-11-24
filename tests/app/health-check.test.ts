import { describe, expect, test } from "vitest"
import { app } from "../../src/app"

describe("App Routes", () => {
  test("should return 200 on health check", async () => {
    const response = await app.inject({
      method: "GET",
      url: "app/health-check",
    })

    expect(response.statusCode).toBe(200)
  })
})
