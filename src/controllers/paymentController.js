import paymentService from "../services/paymentService.js";

export const createPayment = async (req, reply) => {
  try {
    const result = await paymentService.createPayment(req.body);
    reply.send(result);
  } catch (err) {
    console.error("🔥 Create Payment Error:", err.response?.data || err.message);
    reply.code(500).send({ message: err.message });
  }
};

export const paymentCallback = async (req, reply) => {
  try {
    console.log("🔥 CALLBACK RECEIVED:", req.body);
    await paymentService.handleCallback(req.body);
    reply.status(200).send("OK");
  } catch (err) {
    console.error("🔥 Callback Error:", err);
    reply.code(500).send({ message: err.message });
  }
};

export const getInvoice = async (req, reply) => {
  try {
    const invoiceId = req.params.id;
    const data = await paymentService.getInvoice(invoiceId);
    reply.send(data);
  } catch (err) {
    console.error("🔥 Get Invoice Error:", err.message);
    reply.code(500).send({ message: err.message });
  }
};

export const getAllInvoices = async (req, reply) => {
  try {
    const invoices = await paymentService.getAllInvoices();
    reply.send(invoices);
  } catch (err) {
    console.error("🔥 Get All Invoices Error:", err.message);
    reply.code(500).send({ message: err.message });
  }
};
