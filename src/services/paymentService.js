import XenditService from "./xenditService.js";
import paymentModel from "../models/paymentModel.js";

let xendit = null;

// lazy initialization = hanya dibuat saat pertama kali dipakai
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
    const x = getXendit(); // optional
    await paymentModel.updateStatus(external_id, status);
  }
};
