import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  // Obtener un solo producto por ID
  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  // Limitar resultados
  getLimitedProducts(limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products?limit=${limit}`);
  }

  // Ordenar resultados
  sortProducts(order: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products?sort=${order}`);
  }

  // Obtener todas las categorías
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/categories`);
  }

  // Obtener productos por categoría
  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/category/${category}`);
  }

  // Añadir un nuevo producto
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  // Actualizar un producto
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }
}
