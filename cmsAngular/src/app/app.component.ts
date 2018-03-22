import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Get to determine if admin user and display admin navbar
  get front(){
    if(localStorage.getItem("user") === "\"admin\""){
      return false;
    }
    return true;
  }
}
