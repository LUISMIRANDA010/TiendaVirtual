import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl: string = `${environment.apiUrl}/carts`;

  constructor(private http: HttpClient) { }

  // Obtener todos los carritos
  getCartItems(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Obtener un carrito específico por ID
  getCartById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Agregar un nuevo carrito
  addCart(cart: any): Observable<any> {
    return this.http.post(this.baseUrl, cart);
  }

  // Actualizar un carrito
  updateCart(id: number, cart: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, cart);
  }

  // Eliminar un carrito
  deleteCart(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
