import Fastify from "fastify";
import paymentRoutes from "./src/routes/paymentRoutes.js";

const app = Fastify({ logger: true });

app.get("/", (req, reply) => {
  reply.send({ message: "BriliQ Payment Service running" });
});

app.register(paymentRoutes, { prefix: "/payments" });

export default app;
