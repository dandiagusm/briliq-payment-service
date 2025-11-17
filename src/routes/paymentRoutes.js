import {
  createPayment,
  paymentCallback,
  getInvoice,
  getAllInvoices
} from "../controllers/paymentController.js";

async function routes(fastify) {
  fastify.post("/create", createPayment);
  fastify.post("/callback", paymentCallback);
  fastify.get("/:id", getInvoice);
  fastify.get("/", getAllInvoices);
}

export default routes;
