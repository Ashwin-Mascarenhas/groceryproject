import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.checkAuth();
    this.fetchProducts();
    this.fetchCategories();
  }

  checkAuth() {
    this.isAuthenticated = !!localStorage.getItem('jwt');
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.applyFilters();
    });
  }

  fetchCategories() {
    this.http.get<any[]>('/api/categories').subscribe((data) => {
      this.categories = data.map(c => c.name);
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      const matchesSearch = this.searchTerm ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      return matchesCategory && matchesSearch;
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  addToCart(product: any) {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(product);
    // Optionally show a snackbar/toast
  }

  buyNow(product: any) {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/register']);
  }
} 