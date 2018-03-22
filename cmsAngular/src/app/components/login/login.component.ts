import { Component, OnInit } from "@angular/core";

import { UserService } from "../../services/user.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  //Declare properties
  public loginFailed: boolean = false;
  public userRegistered: boolean = false;

  constructor(
    private userService: UserService, 
    private router: Router
  ) {}

  ngOnInit() {
    //prevent navigation once logged in
    if (localStorage.getItem("user")) this.router.navigateByUrl("");

    if (localStorage.getItem("userRegistered")) {
      this.userRegistered = true;
      localStorage.removeItem("userRegistered");
    }
  }

  onSubmit({ value, valid }) {
    if (valid) {
      this.userService.login(value).subscribe(res => {
        if (res == "invalidLogin") {
          this.loginFailed = true;
          setTimeout(() => {
            this.loginFailed = false;
          }, 2000);
        } else {
          //assign user value from local storage to user
          localStorage.setItem("user", JSON.stringify(res));

          //if user an admin user (escape double quotes - stringify) navigate to admin page
          if (localStorage.getItem("user") === "\"admin\"") {
            this.router.navigateByUrl("admin/pages");
          } else {
            this.router.navigateByUrl('');
          }
        }
      });
    } else {
      console.log("Form is not valid");
    }
  }
}
