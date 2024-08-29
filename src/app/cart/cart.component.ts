import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.page.html',
  styleUrls: ['./cart.component.page.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  paymentCompleted: boolean = false;

  constructor(
    private cartService: CartService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) =>
      total + (item.product?.price || 0) * (item.quantity || 0), 0
    );
  }

  async removeItem(itemId: number) {
    try {
      this.cartService.removeCartItem(itemId);
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      this.calculateTotal();
      const toast = await this.toastController.create({
        message: 'Item removed from cart!',
        duration: 2000
      });
      toast.present();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  updateQuantity(itemId: number, quantity: number) {
    const updatedItem = this.cartItems.find(item => item.id === itemId);
    if (updatedItem) {
      this.cartService.updateCartItemQuantity(itemId, quantity);
      this.calculateTotal();
    }
  }

  async pay() {
    try {
      this.cartService.clearCart(); // Limpia el carrito
      this.cartItems = [];
      this.totalAmount = 0;
      this.paymentCompleted = true;
      const toast = await this.toastController.create({
        message: 'Payment successful!',
        duration: 2000
      });
      toast.present();
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  
}
