import axios from "axios";

class XenditService {
  constructor() {
    const key = process.env.XENDIT_SECRET;
    if (!key) {
      console.error("❌ Missing XENDIT_SECRET in environment. Set XENDIT_SECRET in .env");
    }

    this.client = axios.create({
      baseURL: "https://api.xendit.co",
      auth: { username: key ?? "", password: "" }
    });
  }

  async createInvoice(orderId, amount) {
   const payload = {
    external_id: orderId,
    amount,
    payment_methods: ["QRIS"]  // hanya QRIS
  };

   const { data } = await this.client.post("/v2/invoices", payload);
   return data;
 }

}

export default XenditService;
