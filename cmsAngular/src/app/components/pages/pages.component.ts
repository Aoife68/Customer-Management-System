import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { PageService } from '../../services/page.service';
import { SidebarService } from '../../services/sidebar.service';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
//Declare Properties
private param:
any;
public pageBody: any;
public pages: any;
public sidebar: string;
public hasSidebar: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService,
    private sidebarService: SidebarService,
    private title: Title
  ) { }

  ngOnInit() {
    //Get All Pages
    this.pageService.getPages().subscribe(pages => {
      this.pages = pages;
    });

    /*Lecture 14 - Page Components*/
    //Get the params from the route
    this.route.params.subscribe(params => {
      this.param = params['page'];
      if(this.param === undefined){
        this.param = 'home';
        this.title.setTitle('CMS');
      } else{
        /*Lecture 15 Adding Pages*/
        //Set title to reflect each page
        this.title.setTitle(this.param.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
      }

      /*Lecture 14 - Page Components*/
      //Get Single page
      this.pageService.getPage(this.param).subscribe(pageBody => {
        if(pageBody === null){
          this.router.navigateByUrl('');
        }
        this.pageBody = pageBody;

        //Check for sidebar
        if(pageBody.sidebar === "yes"){
          this.hasSidebar = true;
          this.sidebarService.getSidebar().subscribe(sidebar => {
            this.sidebar = sidebar.content;
          });
        } else {
          this.hasSidebar = false;
        }

      });
    });
  }

}
