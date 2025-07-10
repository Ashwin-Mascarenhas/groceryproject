import { Component, OnInit } from '@angular/core';
import { OrdersService, Order } from '../orders.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  error: string | null = null;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  /**
   * Fetch all orders for the current user
   */
  fetchOrders(): void {
    this.loading = true;
    this.error = null;
    this.ordersService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }
}
