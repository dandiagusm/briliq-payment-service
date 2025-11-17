import { createPayment, paymentCallback, getInvoice } from "../controllers/paymentController.js";

async function routes(fastify) {
  fastify.post("/create", createPayment);
  fastify.post("/callback", paymentCallback);
  fastify.get("/:id", getInvoice);
}

export default routes;
