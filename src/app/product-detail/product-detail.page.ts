import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: 'product-detail.page.html',
  styleUrls: ['product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Verificar que params.get('id') sea un valor válido
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(parseInt(productId, 10)).subscribe(data => {
          this.product = data;
        });
      } else {
        // Manejo de errores si no se proporciona un ID
        console.error('Product ID is not available');
      }
    });
  }

  async addToCart() {
    const toast = await this.toastController.create({
      message: 'Product added to cart!',
      duration: 2000
    });
    toast.present();
    // Aquí puedes agregar el producto al carrito
    this.cartService.addCart({ product: this.product, quantity: 1 });
  }
}
