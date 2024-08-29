import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartComponent } from './cart.component'; 
import { CartPageRoutingModule } from './cart-routing.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule
  ],
  declarations: [CartComponent]
  
})
export class CartPageModule {}
