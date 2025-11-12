package com.briliq.payment_service.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {
    private Long id;
    private Double amount;
    private String currency;
    private String status;
    private String method;
    private String description;
    private LocalDateTime createdAt;
}
