package com.briliq.payment_service.service;

import com.briliq.payment_service.dto.PaymentRequest;
import com.briliq.payment_service.dto.PaymentResponse;

import java.util.List;

public interface PaymentService {
    PaymentResponse createPayment(PaymentRequest request);
    List<PaymentResponse> getAllPayments();
    PaymentResponse getPaymentById(Long id);
    PaymentResponse updatePayment(Long id, PaymentRequest request);
    void deletePayment(Long id);
}
