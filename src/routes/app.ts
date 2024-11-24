import { FastifyInstance } from "fastify/types/instance"
import { AppController } from "../controllers/app"

export async function appRoutes(app: FastifyInstance) {
  app.get(
    "/health-check",
    {
      // onRequest: [verifyJwt],
    },
    AppController.healthCheckController,
  )
}
