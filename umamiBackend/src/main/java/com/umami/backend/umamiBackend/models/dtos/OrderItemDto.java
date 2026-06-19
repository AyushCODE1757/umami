package com.umami.backend.umamiBackend.models.dtos;

import jakarta.persistence.Embeddable;

@Embeddable
public record OrderItemDto(
        String id,       // Matches meal item ID from frontend
        String name,
        int quantity,
        String price
) {
    public OrderItemDto() {
        this(null, null, 0, null);
    }
}