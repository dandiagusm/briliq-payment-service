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

  async updateByInvoiceId(id, payload) {
    for (const [key, value] of this.db) {
      if (value.metadata.id === id) {
        const updated = { ...value, ...payload, updatedAt: new Date() };
        this.db.set(key, updated);
      }
    }
  }

  async find(orderId) {
    return this.db.get(orderId);
  }

  async findByInvoiceId(id) {
    for (const value of this.db.values()) {
      if (value.metadata.id === id) return value;
    }
    return null;
  }

  async findAll() {
    return Array.from(this.db.values());
  }

  async findByUser(userId) {
    return Array.from(this.db.values()).filter(p => p.userId === userId);
  }

  async search({ status, from, to, limit = 20, offset = 0 }) {
    let data = Array.from(this.db.values());

    if (status) data = data.filter(p => p.status === status);
    if (from) data = data.filter(p => new Date(p.createdAt) >= new Date(from));
    if (to) data = data.filter(p => new Date(p.createdAt) <= new Date(to));

    return data.slice(offset, offset + limit);
  }
}

export default new PaymentModel();
