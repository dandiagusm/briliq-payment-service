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
    p.updatedAt = new Date();
    this.db.set(orderId, p);
  }

  async updateByInvoiceId(invoiceId, payload) {
    for (const [key, value] of this.db) {
      if (value.invoiceId === invoiceId) {
        const updated = { ...value, ...payload, updatedAt: new Date() };
        this.db.set(key, updated);
      }
    }
  }

  async find(orderId) {
    return this.db.get(orderId);
  }

  async findByUser(userId) {
    return Array.from(this.db.values()).filter(p => p.userId === userId);
  }

  async findAll() {
    return Array.from(this.db.values());
  }

  async search(filters) {
    let data = Array.from(this.db.values());

    if (filters.status) {
      data = data.filter(p => p.status === filters.status);
    }

    return data;
  }
}

export default new PaymentModel();
