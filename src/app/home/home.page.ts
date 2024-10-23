import { Component, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonButton, IonButtons, IonModal, IonAlert, AlertController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonAlert, IonModal, IonButtons, IonButton, IonItem, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule],
})
export class HomePage {
  @ViewChild(IonModal) modal?: IonModal;

  users: User[] = [];
  loginUsername: string = "";
  loginPswd: string = ""
  // variables para registrarse
  name: string = "";
  username: string ="";
  pswd: string = "";
  confirmPswd: string = "";
  store: string = "";
  image: string = "";

  constructor(private alertController: AlertController) {
    this.readUsersLocalStorage();
  }

  login() {
    // algún campo vació
    if (!this.loginUsername || !this.loginPswd){
      this.alert("Error", "Nombre de usuario o contraseña incorrecta");
    }
    else {
      let user = this.users.find(user => user.username == this.loginUsername && user.pswd == this.loginPswd)
      
      if(user)
        console.log("Usuario encontrado", user);
      else 
        this.alert("Error", "Nombre de usuario o contraseña incorrecta");
    }
  }

  signUp() {
    this.cleanSignUp(); 
    this.cleanLogin(); // debería ser cuando se cierre, pero si no se da clic en el botón cancelar pos no se limpia, así es más sencillo
    this.modal?.present();
  }

  createUser() {
    // algún campo vació
    if (!this.name || !this.username || !this.pswd || !this.confirmPswd || !this.store || !this.image)
      this.alert("Error", "Tienes que llenar todos los campos");
    else {
      const user = this.users.find(user => user.username == this.username);
      const store = this.users.find(store => store.store == this.store);

      // validación de los datos
      if (user)
        this.alert("Error", `Ya existe un nombre de usuario ${user.username}`);
      else if (store)
        this.alert("Error", `No se puede repetir la tienda ${store.store}`);
      else if (this.pswd != this.confirmPswd)
        this.alert("Error", "Las contraseñas tienen que ser iguales");
      else {
        const newUser: User = {
          id: uuidv4(),
          name: this.name,
          username: this.username,
          pswd: this.pswd,
          store: this.store,
          image: this.image
        }

        this.users.push(newUser);
        this.saveUsersLocalStorage();

        this.alert("Agregado", `Usuario ${this.username} creado`);
        this.closeModal();
      }
    }
  }

  closeModal() {
    this.modal?.dismiss();
  }

  // para mostrar alertas de ionic
  async alert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ["OK"]
    });

    await alert.present();
  }
  
  cleanLogin() {
    this.loginUsername = "";
    this.loginPswd = "";
  }

  cleanSignUp() {
    this.name = "";
    this.username = "";
    this.pswd = "";
    this.confirmPswd = "";
    this.store = "";
    this.image = "";
  }
  /* ------------------------------ LOCAL STORAGE ----------------------------- */

  readUsersLocalStorage() {
    const usersLocalStorage = localStorage.getItem("users");

    if(usersLocalStorage) {
      this.users = JSON.parse(usersLocalStorage);
    }
  }

  saveUsersLocalStorage() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }
}

