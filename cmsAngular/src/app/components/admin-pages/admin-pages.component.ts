import { Component, OnInit } from "@angular/core";
import { PageService } from "../../services/page.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-pages",
  templateUrl: "./admin-pages.component.html",
  styleUrls: ["./admin-pages.component.css"]
})
export class AdminPagesComponent implements OnInit {
  //Declare Properties
  pages: any;
  successMsg: boolean = false;
  errorMsg: boolean = false;

  constructor(private pageService: PageService, private router: Router) {}

  ngOnInit() {
    //Check if admin user - if not redirect to home page
    if (localStorage.getItem("user") !== '"admin"') {
      this.router.navigateByUrl("");
    }
    this.pages = this.pageService.pagesBS;
  }

  //Delete Page method
  deletePage(id) {
    if (confirm("Are you sure?")) {
      this.pageService.deletePage(id).subscribe(res => {
        if (res == "error") {
          //display error message for 4 secs
          this.errorMsg = true;
          setTimeout(() => {
            this.errorMsg = false;
          }, 4000);
        } else {
          //display success msg for 4 secs
          this.successMsg = true;
          setTimeout(() => {
            this.successMsg = false;
          }, 4000);

          //Update Pages BS
          this.pageService.getPages().subscribe(pages => {
            this.pageService.pagesBS.next(pages);
          });
        }
      });
    }
  }
}
