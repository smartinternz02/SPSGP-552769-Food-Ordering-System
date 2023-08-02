import { Injectable } from '@angular/core';
import { MenuItem } from './MenuItem';
import { Cart, CartItem } from './Cart';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: MenuItem[] = [];

  constructor(private http: HttpClient) {}

  addToCart(menuItem: MenuItem) {
    const existingItem = this.cartItems.find(item => item._id === menuItem._id);
    if (existingItem) {
      // Item already exists in the cart, update the quantity
      existingItem.quantity += menuItem.quantity;
    } else {
      // Item does not exist in the cart, add it
      this.cartItems.push(menuItem);
    }
  }
  getCartItems(): MenuItem[] {
    return this.cartItems;
  }


  getCart(): Observable<Cart> {
    // Replace 'userId' with the actual user ID
    const userId = localStorage.getItem('userId');
    return this.http.get<Cart>(`http://localhost:3000/cart/${userId}`);
  }


  clearCart() {
    this.cartItems = [];
  }
}
