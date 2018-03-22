import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //Declare Properties
  userExists: boolean = false;

  constructor(
    private userService: UserService, 
    private router: Router
  ) { }

  ngOnInit() {
    //prevent navigation once logged in
    if(localStorage.getItem("user")) this.router.navigateByUrl('');
  }

  onSubmit({value, valid}){
    if(valid){
      this.userService.register(value).subscribe(res => {
        if(res == 'userExists'){
          this.userExists = true;
          setTimeout(() =>{
            this.userExists =false;
          }, 2000);
        } else {
          //userRegistered will display in login page
          localStorage.setItem('userRegistered', "true");     
          this.router.navigateByUrl('login');
        }
      });
    } else {
      console.log('Form is not valid');
      
    }
  }

}
