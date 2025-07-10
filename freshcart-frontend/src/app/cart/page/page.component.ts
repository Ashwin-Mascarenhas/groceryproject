import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  /**
   * Load cart items from the service
   */
  loadCart(): void {
    this.cartItems = this.cartService.getItems();
  }

  /**
   * Remove an item from the cart
   */
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  /**
   * Clear the cart
   */
  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  /**
   * Calculate the total price of the cart
   */
  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
}
