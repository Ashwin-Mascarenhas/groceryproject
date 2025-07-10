import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(private productService: ProductService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategories();
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
} 