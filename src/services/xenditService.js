import axios from "axios";

class XenditService {
  constructor() {
    const key = process.env.XENDIT_SECRET;
    if (!key) {
      console.error("❌ Missing XENDIT_SECRET in environment.");
    }

    this.client = axios.create({
      baseURL: "https://api.xendit.co",
      auth: { username: key ?? "", password: "" }
    });
  }

  async createInvoice(orderId, amount, userId) {
    const payload = {
      external_id: orderId,
      amount,
      payment_methods: ["QRIS"],
      customer_id: userId
    };

    const { data } = await this.client.post("/v2/invoices", payload);
    return data;
  }

  async getInvoice(id) {
    const { data } = await this.client.get(`/v2/invoices/${id}`);
    return data;
  }

  async cancelInvoice(id) {
    const { data } = await this.client.post(`/v2/invoices/${id}/void`);
    return data;
  }

  async expireInvoice(id) {
    const { data } = await this.client.post(`/v2/invoices/${id}/expire`);
    return data;
  }

  async refund({ paymentId, amount }) {
    const { data } = await this.client.post(`/v2/refunds`, {
      payment_id: paymentId,
      amount
    });
    return data;
  }

  async reconcile(id) {
    const { data } = await this.client.get(`/v2/invoices/${id}`);
    return data;
  }
}

export default XenditService;
