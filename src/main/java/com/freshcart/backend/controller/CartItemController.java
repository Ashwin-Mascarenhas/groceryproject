package com.freshcart.backend.controller;

import com.freshcart.backend.entity.CartItem;
import com.freshcart.backend.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import jakarta.validation.Valid;
import java.util.List;

/**
 * REST controller for managing cart items.
 */
@RestController
@RequestMapping("/api/cart-items")
@Validated
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    /**
     * Get all cart items.
     */
    @GetMapping
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        return ResponseEntity.ok(cartItemService.getAllCartItems());
    }

    /**
     * Get a cart item by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable Long id) {
        return cartItemService.getCartItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create a new cart item (authenticated users only).
     */
    @PreAuthorize("hasAnyRole('USER', 'CUSTOMER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<CartItem> createCartItem(@Valid @RequestBody CartItem cartItem) {
        CartItem created = cartItemService.createCartItem(cartItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Update an existing cart item (authenticated users only).
     */
    @PreAuthorize("hasAnyRole('USER', 'CUSTOMER', 'ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long id, @Valid @RequestBody CartItem cartItem) {
        return cartItemService.updateCartItem(id, cartItem)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Delete a cart item by ID (authenticated users only).
     */
    @PreAuthorize("hasAnyRole('USER', 'CUSTOMER', 'ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);
        return ResponseEntity.noContent().build();
    }
} 