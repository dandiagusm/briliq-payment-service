package com.briliq.payment_service.service.impl;

import com.briliq.payment_service.model.Payment;
import com.briliq.payment_service.repository.PaymentRepository;
import com.briliq.payment_service.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    @Override
    public Payment createPayment(Payment payment) {
        payment.setId(UUID.randomUUID().toString());
        payment.setStatus("PENDING");
        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}
