package com.briliq.payment_service.service.impl;

import com.briliq.payment_service.dto.PaymentRequest;
import com.briliq.payment_service.dto.PaymentResponse;
import com.briliq.payment_service.model.Payment;
import com.briliq.payment_service.repository.PaymentRepository;
import com.briliq.payment_service.service.PaymentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    private PaymentResponse mapToResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .amount(payment.getAmount())
                .currency(payment.getCurrency())
                .status(payment.getStatus())
                .description(payment.getDescription())
                .method(payment.getMethod())
                .createdAt(payment.getCreatedAt())
                .build();
    }

    @Override
    public PaymentResponse createPayment(PaymentRequest request) {
        Payment payment = Payment.builder()
                .amount(request.getAmount())
                .currency(request.getCurrency())
                .description(request.getDescription())
                .method(request.getMethod())
                .status("PENDING")
                .build();

        return mapToResponse(paymentRepository.save(payment));
    }

    @Override
    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentResponse getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return mapToResponse(payment);
    }

    @Override
    public PaymentResponse updatePayment(Long id, PaymentRequest request) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setAmount(request.getAmount());
        payment.setCurrency(request.getCurrency());
        payment.setDescription(request.getDescription());
        payment.setMethod(request.getMethod());

        return mapToResponse(paymentRepository.save(payment));
    }

    @Override
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
