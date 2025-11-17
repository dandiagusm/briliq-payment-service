import paymentService from "../services/paymentService.js";

export const createPayment = async (req, reply) => {
  try {
    const result = await paymentService.createPayment(req.body);
    reply.send(result);
  } catch (err) {
    console.error("Create Payment Error:", err);
    reply.code(500).send({ message: err.message });
  }
};

export const paymentCallback = async (req, reply) => {
  try {
    await paymentService.handleCallback(req.body);
    reply.status(200).send("OK");
  } catch (err) {
    reply.code(500).send({ message: err.message });
  }
};
