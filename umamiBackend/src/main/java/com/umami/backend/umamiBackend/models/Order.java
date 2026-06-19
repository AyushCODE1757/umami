package com.umami.backend.umamiBackend.models;

import com.umami.backend.umamiBackend.models.dtos.OrderItemDto; // Lowercase "dto" import
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "customer_orders")
@Data
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String street;
    private String postalCode;
    private String city;

    // Tells Hibernate to map this record as a collection of relational columns
    @ElementCollection
    @CollectionTable(name = "order_items", joinColumns = @JoinColumn(name = "order_id"))
    private List<OrderItemDto> items;

    public Order(String name, String email, String street, String postalCode, String city, List<OrderItemDto> items) {
        this.name = name;
        this.email = email;
        this.street = street;
        this.postalCode = postalCode;
        this.city = city;
        this.items = items;
    }
}