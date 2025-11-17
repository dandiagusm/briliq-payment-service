import XenditService from "./xenditService.js";
import paymentModel from "../models/paymentModel.js";
import QRCode from "qrcode";

import crypto from "crypto";
import paymentModel from "../models/paymentModel.js";

function verifySignature(rawBody, signature) {
  const secret = process.env.XENDIT_WEBHOOK_SECRET;

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(rawBody);

  const digest = hmac.digest("hex");

  return digest === signature;
}

let xendit = null;
function getXendit() {
  if (!xendit) xendit = new XenditService();
  return xendit;
}

export default {
  async createPayment({ orderId, amount, userId }) {
    const x = getXendit();
    const invoice = await x.createInvoice(orderId, amount, userId);

    await paymentModel.save({
      orderId,
      userId,
      amount,
      status: "PENDING",
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: invoice
    });

    return invoice;
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

  async generateQRImage(id) {
    const invoice = await this.getInvoice(id);
    const qrString = invoice.qr_string;
    return await QRCode.toDataURL(qrString);
  },

  async cancel(id) {
    const x = getXendit();
    const data = await x.cancelInvoice(id);
    await paymentModel.updateByInvoiceId(id, { status: "CANCELLED" });
    return data;
  },

  async expire(id) {
    const x = getXendit();
    const data = await x.expireInvoice(id);
    await paymentModel.updateByInvoiceId(id, { status: "EXPIRED" });
    return data;
  },

  async refund({ invoiceId, amount }) {
    const x = getXendit();
    return await x.refund({ paymentId: invoiceId, amount });
  },

  async reconcile(id) {
    const x = getXendit();
    return await x.reconcile(id);
  },

  async handleCallback(body, token) {
    if (token !== process.env.X_CALLBACK_TOKEN) {
      throw new Error("Invalid callback token");
    }

    const { external_id, status } = body;
    await paymentModel.updateStatus(external_id, status);

    return { success: true };
  },

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
