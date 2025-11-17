class PaymentModel {
  constructor() {
    this.db = new Map();
  }

  async save(payment) {
    this.db.set(payment.orderId, payment);
  }

  async updateStatus(orderId, status) {
    const p = this.db.get(orderId);
    if (!p) return;
    p.status = status;
    this.db.set(orderId, p);
  }
}

export default new PaymentModel();
