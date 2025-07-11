import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

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
  isAuthenticated: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuth();
    this.loadGroceryProducts();
    this.loadCategories();
  }

  checkAuth() {
    this.isAuthenticated = !!localStorage.getItem('jwt');
  }

  loadGroceryProducts() {
    // Real grocery store products
    this.products = [
      {
        id: 1,
        name: 'Fresh Organic Bananas',
        shortDescription: 'Sweet and ripe organic bananas, perfect for smoothies',
        price: 89,
        category: 'Fruits',
        imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300',
        stockQuantity: 50,
        unit: 'kg'
      },
      {
        id: 2,
        name: 'Fresh Tomatoes',
        shortDescription: 'Juicy red tomatoes, great for salads and cooking',
        price: 45,
        category: 'Vegetables',
        imageUrl: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300',
        stockQuantity: 30,
        unit: 'kg'
      },
      {
        id: 3,
        name: 'Whole Milk',
        shortDescription: 'Fresh whole milk, rich in calcium and protein',
        price: 65,
        category: 'Dairy',
        imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300',
        stockQuantity: 25,
        unit: 'liter'
      },
      {
        id: 4,
        name: 'Chicken Breast',
        shortDescription: 'Fresh boneless chicken breast, perfect for grilling',
        price: 320,
        category: 'Meat',
        imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300',
        stockQuantity: 15,
        unit: 'kg'
      },
      {
        id: 5,
        name: 'Brown Bread',
        shortDescription: 'Fresh whole wheat bread, healthy and nutritious',
        price: 35,
        category: 'Bakery',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',
        stockQuantity: 40,
        unit: 'pack'
      },
      {
        id: 6,
        name: 'Fresh Eggs',
        shortDescription: 'Farm fresh eggs, rich in protein',
        price: 120,
        category: 'Dairy',
        imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300',
        stockQuantity: 60,
        unit: 'dozen'
      },
      {
        id: 7,
        name: 'Organic Spinach',
        shortDescription: 'Fresh organic spinach, packed with nutrients',
        price: 55,
        category: 'Vegetables',
        imageUrl: 'https://images.unsplash.com/photo-1576045057985-068d6ea3c4b5?w=300',
        stockQuantity: 20,
        unit: 'bunch'
      },
      {
        id: 8,
        name: 'Fresh Apples',
        shortDescription: 'Crisp and juicy red apples',
        price: 180,
        category: 'Fruits',
        imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300',
        stockQuantity: 35,
        unit: 'kg'
      },
      {
        id: 9,
        name: 'Cheddar Cheese',
        shortDescription: 'Aged cheddar cheese, perfect for sandwiches',
        price: 280,
        category: 'Dairy',
        imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300',
        stockQuantity: 18,
        unit: 'pack'
      },
      {
        id: 10,
        name: 'Fresh Onions',
        shortDescription: 'Fresh white onions, essential for cooking',
        price: 30,
        category: 'Vegetables',
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300',
        stockQuantity: 45,
        unit: 'kg'
      },
      {
        id: 11,
        name: 'Ground Beef',
        shortDescription: 'Fresh ground beef, perfect for burgers',
        price: 450,
        category: 'Meat',
        imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300',
        stockQuantity: 12,
        unit: 'kg'
      },
      {
        id: 12,
        name: 'Croissants',
        shortDescription: 'Buttery French croissants, baked fresh daily',
        price: 25,
        category: 'Bakery',
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038805a?w=300',
        stockQuantity: 30,
        unit: 'piece'
      }
    ];
    this.applyFilters();
  }

  loadCategories() {
    this.categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery'];
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      const matchesSearch = this.searchTerm ? 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
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
  }

  buyNow(product: any) {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }
} 