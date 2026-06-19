package com.umami.backend.umamiBackend.controller;

import com.umami.backend.umamiBackend.models.Meal;
import com.umami.backend.umamiBackend.models.dtos.OrderDTO;
import com.umami.backend.umamiBackend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping
// CrossOrigin handles CORS requirements just like your Express middleware did
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class FoodController {
    @Autowired
    private FoodService foodService;

    @GetMapping("/meals")
    public ResponseEntity<List<Meal>> getMeals() {
        List<Meal> meals = foodService.getAllMeals();
        return ResponseEntity.ok(meals);
    }

    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDto) {
        try {
            String orderId = foodService.processOrder(orderDto);

            // Return a 201 Created response along with a clean confirmation message
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(
                            "message", "Order created!",
                            "orderId", orderId
                    ));
        } catch (IllegalArgumentException e) {
            // Catches our defensive fallback check from the service layer
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
