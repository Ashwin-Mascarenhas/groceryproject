import { Injectable } from '@angular/core';
import { Product } from '../products/products.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'freshcart_cart';
  private items: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  /**
   * Get all items in the cart
   */
  getItems(): CartItem[] {
    return this.items;
  }

  /**
   * Add a product to the cart (or increase quantity)
   */
  addToCart(product: Product): void {
    const existing = this.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.saveCart();
  }

  /**
   * Remove a product from the cart
   */
  removeFromCart(productId: number): void {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  /**
   * Clear the cart
   */
  clearCart(): void {
    this.items = [];
    this.saveCart();
  }

  /**
   * Save cart to local storage
   */
  private saveCart(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  /**
   * Load cart from local storage
   */
  private loadCart(): void {
    const data = localStorage.getItem(this.storageKey);
    this.items = data ? JSON.parse(data) : [];
  }
} 