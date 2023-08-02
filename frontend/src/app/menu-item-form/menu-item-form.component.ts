import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-item-form',
  templateUrl: './menu-item-form.component.html',
})
export class MenuItemFormComponent {
  menuItem = {
    name: '',
    price: 0,
    restaurantName: ''
  };
  restaurantName : string;
  restaurantId!: string;
  userId!: string;
  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn



  constructor(private route: ActivatedRoute, private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this._isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = params['restaurantId'];
      this.restaurantName = params['restaurantName'];
      this.userId = params['userId'];


    });
  }

  addMenuItem() {
    const userId = this.userId; // Replace with the actual user ID
    const restaurantId = this.restaurantId; // Replace with the actual restaurant ID

    const newMenuItem = {
      name: this.menuItem.name,
      price: this.menuItem.price,
      restaurantName : this.menuItem.restaurantName,
      // restaurantId : this.restaurantId,
    };


    console.log(this.restaurantName);

    this.http.post(`http://localhost:3000/menuitem`, newMenuItem).subscribe(
      (response) => {
        console.log('Menu item added successfully:', response);
        // Reset form values
        this.menuItem.name = '';
        this.menuItem.price = 0;
        this.menuItem.restaurantName='';
      },
      (error) => {
        console.error('Error adding menu item:', error);
      }
    );
  }

  get isLoggedIn() {
    return this._isLoggedIn; // return the private backing field
  }
}
