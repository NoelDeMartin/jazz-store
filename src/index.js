import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { auth } from "./auth.js";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const fastify = Fastify();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

fastify.register(fastifyCors, {
  origin: process.env.TRUSTED_ORIGINS.split(","),
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "X-Jazz-Auth",
  ],
  credentials: true,
  maxAge: 86400,
});

fastify.get("/", async function (_, response) {
  const html = await readFile(join(__dirname, "index.html"), "utf-8");

  response.type("text/html");
  response.send(html);
});

fastify.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, response) {
    const url = new URL(
      request.url,
      `${process.env.NODE_ENV === "production" ? "https" : "http"}://${
        request.headers.host
      }`
    );
    const headers = new Headers();

    for (const [key, value] of Object.entries(request.headers)) {
      if (!value) {
        continue;
      }

      headers.append(key, value.toString());
    }

    const authRequest = new Request(url.toString(), {
      method: request.method,
      headers,
      body: request.body ? JSON.stringify(request.body) : undefined,
    });

    const authResponse = await auth.handler(authRequest);

    authResponse.headers.forEach((value, key) => response.header(key, value));

    response.status(authResponse.status);
    response.send(authResponse.body ? await authResponse.text() : null);
  },
});

const host = "0.0.0.0";
const port = 3000;

fastify.listen({ host, port }, function (error) {
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }

  console.log(`Listening on ${host}:${port}`);
});
