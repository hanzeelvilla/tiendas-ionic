import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, NavbarComponent]
})
export class MenuPage implements OnInit {
  store: string = "";
  image: string = "";

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    console.log('Menu se ha inicializado');
    this.loadUserData();
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