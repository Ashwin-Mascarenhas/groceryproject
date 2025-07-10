package com.freshcart.backend.service;

import com.freshcart.backend.entity.CartItem;
import com.freshcart.backend.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service for cart item-related business logic.
 */
@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    /**
     * Get all cart items.
     */
    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    /**
     * Get a cart item by ID.
     */
    public Optional<CartItem> getCartItemById(Long id) {
        return cartItemRepository.findById(id);
    }

    /**
     * Create a new cart item.
     */
    public CartItem createCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    /**
     * Update an existing cart item.
     */
    public Optional<CartItem> updateCartItem(Long id, CartItem cartItem) {
        return cartItemRepository.findById(id).map(existing -> {
            cartItem.setId(id);
            return cartItemRepository.save(cartItem);
        });
    }

    /**
     * Delete a cart item by ID.
     */
    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }
} 