import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(
      (data) => {
        this.cartItems = data;
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  async removeItem(itemId: number) {
    try {
      await this.cartService.deleteCart(itemId).toPromise();
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      const toast = await this.toastController.create({
        message: 'Item removed from cart!',
        duration: 2000
      });
      toast.present();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  // Implement methods for editing and updating cart items here
}
