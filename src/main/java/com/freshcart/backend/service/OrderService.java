package com.freshcart.backend.service;

import com.freshcart.backend.entity.Order;
import com.freshcart.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service for order-related business logic.
 */
@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Get all orders.
     */
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    /**
     * Get an order by ID.
     */
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    /**
     * Create a new order.
     */
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    /**
     * Update an existing order.
     */
    public Optional<Order> updateOrder(Long id, Order order) {
        return orderRepository.findById(id).map(existing -> {
            order.setId(id);
            return orderRepository.save(order);
        });
    }

    /**
     * Delete an order by ID.
     */
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
} 