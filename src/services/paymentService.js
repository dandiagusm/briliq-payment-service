import XenditService from "./xenditService.js";
import paymentModel from "../models/paymentModel.js";

let xendit = null;

function getXendit() {
  if (!xendit) {
    xendit = new XenditService();
  }
  return xendit;
}

export default {
  async createPayment({ orderId, amount }) {
    const x = getXendit();

    const invoice = await x.createInvoice(orderId, amount);
    await paymentModel.save({
      orderId,
      amount,
      status: "PENDING",
      metadata: invoice
    });

    return invoice;
  },

  async handleCallback({ external_id, status }) {
    await paymentModel.updateStatus(external_id, status);
  },

  async getInvoice(id) {
    const x = getXendit();
    return await x.getInvoice(id);
  },

  async getAllInvoices() {
    return await paymentModel.findAll();
  }
};
