import axios from "axios";

class XenditService {
  constructor() {
    const key = process.env.XENDIT_SECRET;

    this.client = axios.create({
      baseURL: "https://api.xendit.co",
      auth: { username: key, password: "" }
    });
  }

  async createInvoice(orderId, amount, userId) {
    const payload = {
      external_id: orderId,
      amount,
      customer_id: userId,
      payment_methods: ["QRIS"]
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

  async refund(payload) {
    const { data } = await this.client.post(`/v2/refunds`, payload);
    return data;
  }

  async reconcile(id) {
    const { data } = await this.client.get(`/v2/invoices/${id}`);
    return data;
  }
}

export default XenditService;
