import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isAuthenticated(): boolean {
    const user = localStorage.getItem("loggedInUser");
    return !!user; // devolver en booleano
  }

  login(username: string, pswd: string): boolean {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find( (user: any) => user.username == username && user.pswd == pswd );

    if(user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem("loggedInUser");
  }
}
