import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../products.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(private productsService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  /**
   * Fetch products from the backend and handle loading/error states
   */
  fetchProducts(): void {
    this.loading = true;
    this.error = null;
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products.';
        this.loading = false;
      }
    });
  }

  /**
   * Add to cart handler (to be implemented)
   */
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`Added ${product.name} to cart!`);
  }
}
