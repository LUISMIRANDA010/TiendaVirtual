import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Utiliza BehaviorSubject para manejar el estado del carrito
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$: Observable<any[]> = this.cartSubject.asObservable();

  constructor() { }

  // Obtener todos los artículos del carrito
  getCartItems(): Observable<any[]> {
    return this.cart$;
  }

  // Agregar un nuevo artículo al carrito
  addCart(item: any): void {
    const currentCart = this.cartSubject.value;
    this.cartSubject.next([...currentCart, item]);
  }

  // Eliminar un artículo del carrito por ID
  removeCartItem(itemId: number): void {
    const updatedCart = this.cartSubject.value.filter(item => item.id !== itemId);
    this.cartSubject.next(updatedCart);
  }

  // Actualizar la cantidad de un artículo en el carrito
  updateCartItemQuantity(itemId: number, quantity: number): void {
    const updatedCart = this.cartSubject.value.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    this.cartSubject.next(updatedCart);
  }

  // Limpiar todos los artículos del carrito
  clearCart(): void {
    this.cartSubject.next([]);
  }
}
