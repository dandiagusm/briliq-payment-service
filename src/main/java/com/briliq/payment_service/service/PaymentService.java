package com.briliq.payment_service.service;

import com.briliq.payment_service.model.Payment;
import java.util.List;

public interface PaymentService {
    Payment createPayment(Payment payment);
    List<Payment> getAllPayments();
}
