import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule],
})
export class HomePage {
  users: User[] = []; // array de usuarios
  username: string = "";
  pswd: string = ""

  constructor() {
    //metiendo usuarios para probar que funciona
    const storeImg = "https://d2sapt5dytmohl.cloudfront.net/images/upload/64712/sml/6585920a2f12e7.51221906.jpg"
    this.users = [
      {id: 0, name: "Hanzeel", username: "Walle", pswd: "1234", store: "adhesivos de colima", image:storeImg}
    ]
  }

  login() {
    let user = this.users.find(user => user.username == this.username && user.pswd == this.pswd)

    if(user)
      console.log("Usuario encontrado", user);
    else
      console.log("El usuario no existe");
  }

  signUp() {
    console.log("Registrar a un usuario")
  }
}
