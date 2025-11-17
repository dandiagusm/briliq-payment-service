import Fastify from "fastify";
import paymentRoutes from "./src/routes/paymentRoutes.js";

const app = Fastify({ logger: true });
app.register(paymentRoutes, { prefix: "/payments" });

export default app;
