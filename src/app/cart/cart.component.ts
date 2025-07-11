import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  updateQuantity(itemId: number, quantity: number) {
    this.cartService.updateQuantity(itemId, quantity);
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  proceedToCheckout() {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/place-order']);
    }
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }

  clearCart() {
    this.cartService.clearCart();
  }
} 