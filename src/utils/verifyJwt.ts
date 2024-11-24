import { FastifyRequest, FastifyReply } from "fastify"

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
}