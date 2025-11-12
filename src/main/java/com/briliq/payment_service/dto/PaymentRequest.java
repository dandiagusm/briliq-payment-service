package com.briliq.payment_service.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequest {

    @NotNull(message = "Amount is required")
    @Min(value = 1000, message = "Minimum amount is 1000")
    private Double amount;

    @NotBlank(message = "Currency is required")
    private String currency;

    private String description;

    @NotBlank(message = "Payment method is required")
    private String method;
}
