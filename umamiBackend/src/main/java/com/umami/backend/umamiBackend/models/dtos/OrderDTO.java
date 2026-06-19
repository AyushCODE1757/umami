package com.umami.backend.umamiBackend.models.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record OrderDTO(
        String name,
        String email,
        String street,

        @JsonProperty("postal-code") // Maps incoming "postal-code" from React form data automatically!
        String postalCode,

        String city,
        List<OrderItemDto> items
) {}