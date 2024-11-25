import cors from "@fastify/cors"
import { fastifyJwt } from "@fastify/jwt"
import fastify, { FastifyInstance } from "fastify"
import { promises as fs } from "fs"
import { Server } from "http"
import { FileMigrationProvider, Migrator } from "kysely"
import * as path from "path"
import { ZodError } from "zod"
import { db } from "./config/database"
import { env } from "./config/env"
import { appRoutes } from "./routes/app"
import { jwtErrorCustomMessages } from "./utils/jwtErrorCustomMessages"

export const app: FastifyInstance = fastify()

app.register(cors, { origin: "*" })

// this is like 1 request per second
// app.register(fastifyRateLimit, {
//   max: 300,
//   timeWindow: "5 minute",
//   allowList: ["127.0.0.1"],
// })

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  messages: jwtErrorCustomMessages,
})

app.register(appRoutes, { prefix: "/app" })

export let server: Server

export const startServer = async (): Promise<Server> => {
  const port = env.NODE_ENV === "test" ? env.TEST_APP_PORT : env.APP_PORT
  await app.listen({
    host: "0.0.0.0",
    port,
  })
  server = app.server
  console.log(`HTTP Server Running: ${port}`)

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: "./src/database/migrations",
    }),
  })
  await migrator.migrateToLatest()
  console.log("Migrations applied")

  return server
}

if (process.env.NODE_ENV !== "test") {
  startServer().catch((err) => {
    console.error("Failed to start server:", err)
    process.exit(1)
  })
}

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() })
  }
  if (error.code === "FST_JWT_NO_AUTHORIZATION_IN_HEADER") {
    return reply.status(401).send({ message: error.message })
  }
  if (error.code === "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED") {
    return reply.status(401).send({ message: error.message })
  }
  if (error.code === "FAST_JWT_INVALID_ALGORITHM") {
    return reply.status(401).send({ message: error.message })
  }
  if (error.code === "FST_JWT_AUTHORIZATION_TOKEN_INVALID") {
    return reply.status(401).send({ message: error.message })
  }
  if (env.NODE_ENV !== "production") {
    console.error(error)
  }
  return reply.status(500).send({ message: "internal server error." })
})
