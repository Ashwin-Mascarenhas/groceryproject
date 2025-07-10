import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderDate: string;
  status: string;
  total: number;
  items: OrderItem[];
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private apiUrl = '/api/orders'; // Adjust as needed

  constructor(private http: HttpClient) {}

  /**
   * Fetch all orders for the current user
   */
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetch details for a specific order
   */
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Place a new order
   */
  placeOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return throwError(() => error.error?.message || 'Order request failed.');
  }
} 