import { createPayment, paymentCallback } from "../controllers/paymentController.js";

async function routes(fastify) {
  fastify.post("/create", createPayment);
  fastify.post("/callback", paymentCallback);
}

export default routes;
