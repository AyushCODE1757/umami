package com.umami.backend.umamiBackend.service;

import com.umami.backend.umamiBackend.models.Meal;
import com.umami.backend.umamiBackend.models.Order;
import com.umami.backend.umamiBackend.models.dtos.OrderDTO;
import com.umami.backend.umamiBackend.repo.MealRepo;
import com.umami.backend.umamiBackend.repo.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class FoodService {
    @Autowired
    private MealRepo repo;
    @Autowired
    private OrderRepo orderRepo;
    public List<Meal> getAllMeals() {
        return repo.findAll();
    }

    @Transactional
    public String processOrder(OrderDTO orderDto) {
        // Validation check
        if (orderDto.items() == null || orderDto.items().isEmpty()) {
            throw new IllegalArgumentException("Your order must contain at least one item.");
        }

        // Map the DTO record properties into your persistent Database Entity
        Order newOrder = new Order(
                orderDto.name(),
                orderDto.email(),
                orderDto.street(),
                orderDto.postalCode(),
                orderDto.city(),
                orderDto.items()
        );

        // Save order to the database
        Order savedOrder = orderRepo.save(newOrder);

        // Return the generated ID as a string to satisfy your controller's signature method
        return String.valueOf(savedOrder.getId());
    }
}
