import { Component, OnInit } from '@angular/core';

import { PageService } from "../../services/page.service";

import { Router } from '@angular/router';

//Declare CK EDITOR Variable third party libary
declare const CKEDITOR: any;

//how to do same with jQuery
//declare const $: any;

@Component({
  selector: 'app-admin-add-page',
  templateUrl: './admin-add-page.component.html',
  styleUrls: ['./admin-add-page.component.css']
})
export class AdminAddPageComponent implements OnInit {
  //Declare Properties
  public successMsg: boolean = false;
  public errorMsg: boolean = false;
  public title: string;
  public content: string;

  constructor(
    private pageService: PageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem("user") !== "\"admin\""){
      this.router.navigateByUrl('');
    } else {
      //replace content text area with CKEDitor - lecture 30
    CKEDITOR.replace('content');

    //$('body').addClass('test'); - if using jQuery library
    }    
  }

  onSubmit({form, value, valid}){
    form.reset();
    
    if(valid){
      //Get data from CKEditor and pass to value.content
      value.content = CKEDITOR.instances.content.getData();
      
      this.pageService.postPage(value).subscribe(res => {
        if(res == 'pageExists'){
          //display error message for 4 secs
          this.errorMsg = true;
          setTimeout(() =>{
            this.errorMsg =false;
          }, 4000);
        } else {
          //display success msg for 4 secs
          this.successMsg = true;
          setTimeout(() =>{
            this.successMsg = false;
          }, 4000);

          //Set data from CKEditor to reset content
          CKEDITOR.instances.content.setData('');

          //Set the new page (in navbar via Behavior Subject)
          this.pageService.getPages().subscribe(pages => {
            this.pageService.pagesBS.next(pages);
          });
        }
      });
    } else {
      console.log('Form is not valid');
      
    }
  }

}
