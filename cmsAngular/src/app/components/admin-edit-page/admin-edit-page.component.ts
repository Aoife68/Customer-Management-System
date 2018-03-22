import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PageService } from "../../services/page.service";

//Declare CK EDITOR Variable third party libary
declare const CKEDITOR: any;

@Component({
  selector: "app-admin-edit-page",
  templateUrl: "./admin-edit-page.component.html",
  styleUrls: ["./admin-edit-page.component.css"]
})
export class AdminEditPageComponent implements OnInit {
  page: any;
  title: string;
  content: string;
  id: string;
  successMsg: boolean = false;
  errorMsg: boolean = false;
  editProblemMsg: boolean = false;
  param: any;
  sidebar: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private router: Router
  ) {}

  ngOnInit() {
    //validation to ensure admin access only
    if (localStorage.getItem("user") !== '"admin"') {
      this.router.navigateByUrl("");
    } else {
      CKEDITOR.replace("content");
    }

    this.route.params.subscribe(params => {
      this.param = params["id"];
      this.pageService.getEditPage(this.param).subscribe(page => {
        this.page = page;
        this.title = page.title;
        this.content = page.content;
        this.id = page._id;

        if(page.sidebar === "yes"){
          this.sidebar = true;
        }
      });
    });
  }

  onSubmit({ value, valid }) {
    if (valid) {
      //Get data from CKEditor and pass to value.content
      value.content = CKEDITOR.instances.content.getData();

      this.pageService.postEditPage(value).subscribe(page => {
        if (page == "pageExists") {
          //display error message for 4 secs
          this.errorMsg = true;
          setTimeout(() => {
            this.errorMsg = false;
          }, 4000);
        } else if (page == "editProblem") {
          //display problem editing msg for 4 secs
          this.editProblemMsg = true;
          setTimeout(() => {
            this.editProblemMsg = false;
          }, 4000);
        } else {
          //display problem editing msg for 4 secs
          this.successMsg = true;
          setTimeout(() => {
            this.successMsg = false;
          }, 4000);
         
          //Set the new page (in navbar via Behavior Subject)
          this.pageService.getPages().subscribe(pages => {
            this.pageService.pagesBS.next(pages);
          });
        }
      });
    } else {
      console.log("Form is not valid");
    }
  }
}
