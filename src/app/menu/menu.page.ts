import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonList, IonItem, IonRouterOutlet, IonButtons, IonMenuButton, IonIcon, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonButtons, IonRouterOutlet, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonMenu, IonMenuButton]
})
export class MenuPage implements OnInit {
  store: string = "";
  image: string = "";

  constructor(private authService: AuthService) { }
  ngOnInit() {
    console.log('Menu se ha inicializado');
    this.loadUserData();
  }

  logout() {
    this.authService.logout();
  }

  loadUserData() {
    const userJSON = localStorage.getItem("loggedInUser");

    if (userJSON) {
      const user = JSON.parse(userJSON);
      this.store = user.store;
      this.image = user.image; 
    }

  }
}