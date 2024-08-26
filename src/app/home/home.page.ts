import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
      this.filterProducts();
    });
  }

  loadCategories() {
    this.productService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      const matchesSearch = product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }
}
