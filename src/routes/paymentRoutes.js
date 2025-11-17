import {
  createPayment,
  getInvoice,
  getAllInvoices,
  getStatus,
  getUserInvoices,
  searchInvoices,
  getQRImage,
  cancelInvoice,
  expireInvoice,
  refundPayment,
  reconcile,
  callbackHandler
} from "../controllers/paymentController.js";

async function routes(fastify) {
  fastify.post("/create", createPayment);
  fastify.get("/", getAllInvoices);
  fastify.get("/:id", getInvoice);

  fastify.get("/status/:orderId", getStatus);
  fastify.get("/user/:userId", getUserInvoices);
  fastify.get("/search", searchInvoices);

  fastify.get("/:id/qris-image", getQRImage);
  fastify.post("/cancel/:id", cancelInvoice);
  fastify.post("/expire/:id", expireInvoice);

  fastify.post("/refund", refundPayment);
  fastify.post("/reconcile/:id", reconcile);

  fastify.post("/callback", callbackHandler);
}

export default routes;
