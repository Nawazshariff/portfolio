import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "./projects.service";
import { map } from "rxjs/operators";
import { Project } from "../shared/models/project.model";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
  providers: [ProjectsService],
})
export class ProjectsComponent implements OnInit {
  projectsArr: Project[] = [];
  constructor(private pService: ProjectsService) {}

  ngOnInit() {
    this.pService
      .getAllRepos()
      .pipe(
        map((data: any) => {
          for (let i = 0; i < data.length; i++) {
            let d = data[i].created_at.toString().split("T")[0];
            let date = new Date(d);
            console.log(date);
            data[i].created_at = date;
          }
          return data;
        })
      )
      .subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          this.projectsArr.push({
            name: data[i].name,
            url: data[i].html_url,
            description: data[i].description,
            createdOn: data[i].created_at,
          });
        }
        this.projectsArr.sort((a: any, b: any) => {
          return a.createdOn - b.createdOn;
        });
      });
  }
}
