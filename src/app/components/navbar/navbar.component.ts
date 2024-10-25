import { Component, Input } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonList, IonItem, IonButtons, IonMenuButton, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuButton]
})
export class NavbarComponent {
  @Input() title: string = 'Menú';

  constructor(private router: Router, private authService: AuthService) { }

  goToMenu() {
    this.router.navigate(["/menu"])
  }

  goToProducts() {
    this.router.navigate(["/productos"])
  }

  logout() {
    this.authService.logout();
  }
}