import { FastifyReply } from "fastify/types/reply"
import { FastifyRequest } from "fastify/types/request"
import { healthMessage } from "../../types/app/healthCheck"

export const healthCheckController = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const message: healthMessage = "I am alive!"

  return reply.status(200).send({ status: message })
}
