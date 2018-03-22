import { Component, OnInit } from "@angular/core";
import { SidebarService } from "../../services/sidebar.service";
import { ActivatedRoute, Router } from "@angular/router";

//Declare CK EDITOR Variable third party libary
declare const CKEDITOR: any;

@Component({
  selector: "app-admin-sidebar",
  templateUrl: "./admin-sidebar.component.html",
  styleUrls: ["./admin-sidebar.component.css"]
})
export class AdminSidebarComponent implements OnInit {
  //Declare properties
  content: string;
  successMsg: boolean = false;

  constructor(private sidebarService: SidebarService, private router: Router) {}

  ngOnInit() {
    //validation to ensure admin access only
    if (localStorage.getItem("user") !== '"admin"') {
      this.router.navigateByUrl("");
    } else {
      CKEDITOR.replace("content");
    }

    this.sidebarService.getSidebar().subscribe(sidebar => {
      this.content = sidebar.content;
    });
  }

  onSubmit({ value }) {
    //Get data from CKEditor and pass to value.content
    value.content = CKEDITOR.instances.content.getData();

    this.sidebarService.postSidebar(value).subscribe(page => {
      //display problem editing msg for 4 secs
      this.successMsg = true;
      setTimeout(() => {
        this.successMsg = false;
      }, 4000);

    });
  }
}
