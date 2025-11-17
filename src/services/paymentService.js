import XenditService from "./xenditService.js";
import paymentModel from "../models/paymentModel.js";
import QRCode from "qrcode";

let xendit = null;

function getXendit() {
  if (!xendit) xendit = new XenditService();
  return xendit;
}

export default {
	async createPayment({ orderId, amount, userId }) {
	  const x = getXendit();

	  // CREATE
	  const invoice = await x.createInvoice(orderId, amount, userId);
	
	  // GET FULL INVOICE DETAIL
	  const detail = await x.getInvoice(invoice.id);

	  await paymentModel.save({
	    orderId,
	    amount,
	    userId,
	    invoiceId: detail.id,    // ✔ ID YANG BENAR
	    status: detail.status,
	    metadata: detail,
	    createdAt: new Date(),
	    updatedAt: new Date()
	  });

	  return detail;
	},

  async getInvoice(id) {
  	const x = getXendit();
  	return await x.getInvoice(id);
  },

  async getAllInvoices() {
    return await paymentModel.findAll();
  },

  async getStatus(orderId) {
    return await paymentModel.find(orderId);
  },

  async getUserInvoices(userId) {
    return await paymentModel.findByUser(userId);
  },

  async search(filters) {
    return await paymentModel.search(filters);
  },

async generateQRImage(invoiceId) {
  const x = getXendit();

  // SELALU ambil fresh detail
  const invoice = await x.getInvoice(invoiceId);

  const qrString = invoice.qr_string;

  if (!qrString) {
    throw new Error("QR not ready, try again in 1–2 seconds");
  }

  return await QRCode.toDataURL(qrString);
},


  async cancel(id) {
    const x = getXendit();
    const result = await x.cancelInvoice(id);
    await paymentModel.updateByInvoiceId(id, { status: "CANCELLED" });
		return result;
  },

  async expire(id) {
    const x = getXendit();
    const result = await x.expireInvoice(id);
    await paymentModel.updateByInvoiceId(id, { status: "EXPIRED" });
    return result;
  },

  async refund({ invoiceId, amount }) {
    const x = getXendit();
    return await x.refund({ payment_id: invoiceId, amount });
  },

  async reconcile(id) {
    const x = getXendit();
    return await x.reconcile(id);
  },

  // CALLBACK TOKEN ONLY
  async handleCallback(body, headers) {
    const token = headers["x-callback-token"];

    if (!token) {
      throw new Error("Missing callback token");
    }
    if (token !== process.env.X_CALLBACK_TOKEN) {
      throw new Error("Invalid callback token");
    }

    const { external_id, status } = body;

    await paymentModel.updateStatus(external_id, status);

    return { success: true };
  }
};
