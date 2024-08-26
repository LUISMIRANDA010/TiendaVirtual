import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartPage {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ionViewWillEnter() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  removeItem(itemId: number) {
    this.cartService.deleteCart(itemId).subscribe(() => {
      this.loadCartItems();
    });
  }

  updateQuantity(itemId: number, quantity: number) {
    const updatedItem = this.cartItems.find(item => item.id === itemId);
    if (updatedItem) {
      updatedItem.quantity = quantity;
      this.cartService.updateCart(itemId, updatedItem).subscribe(() => {
        this.calculateTotal();
      });
    }
  }
}
