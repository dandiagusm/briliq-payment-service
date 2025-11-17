import paymentService from "../services/paymentService.js";

export const createPayment = async (req, reply) => {
  try {
    const result = await paymentService.createPayment(req.body);
    reply.send(result);
  } catch (err) {
    reply.code(500).send({ message: err.message });
  }
};

export const getInvoice = async (req, reply) => {
  try {
    reply.send(await paymentService.getInvoice(req.params.id));
  } catch (err) {
    reply.code(500).send({ message: err.message });
  }
};

export const getAllInvoices = async (req, reply) => {
  reply.send(await paymentService.getAllInvoices());
};

export const getStatus = async (req, reply) => {
  reply.send(await paymentService.getStatus(req.params.orderId));
};

export const getUserInvoices = async (req, reply) => {
  reply.send(await paymentService.getUserInvoices(req.params.userId));
};

export const searchInvoices = async (req, reply) => {
  reply.send(await paymentService.search(req.query));
};

export const getQRImage = async (req, reply) => {
  try {
    const img = await paymentService.generateQRImage(req.params.id);
    reply.send({ qr_base64: img });
  } catch (err) {
    reply.code(500).send({ message: err.message });
  }
};

export const cancelInvoice = async (req, reply) => {
  reply.send(await paymentService.cancel(req.params.id));
};

export const expireInvoice = async (req, reply) => {
  reply.send(await paymentService.expire(req.params.id));
};

export const refundPayment = async (req, reply) => {
  reply.send(await paymentService.refund(req.body));
};

export const reconcile = async (req, reply) => {
  reply.send(await paymentService.reconcile(req.params.id));
};

export const callbackHandler = async (req, reply) => {
  try {
    await paymentService.handleCallback(req.body, req.headers);
    reply.send("OK");
  } catch (err) {
    reply.code(403).send({ message: err.message });
  }
};
