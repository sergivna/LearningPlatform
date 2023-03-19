import { Component } from '@angular/core';
import { CoursesService } from '../shared/services/http/courses.service';
import { Course } from './../shared/models/course';
import { OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  pageSlice: Course[] = [];

  constructor(
    private coursesService: CoursesService,
  ) { } 

  ngOnInit() : void {
    this.coursesService.getCourses()
      .subscribe(
        data => {
          this.courses = data.courses;
          this.pageSlice = this.courses.slice(0, 10);
        }
      )
  }

  onPageChange(event: PageEvent) {
    console.log(this.pageSlice);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.courses.length) {
      endIndex = this.courses.length;
    }

    this.pageSlice = this.courses.slice(startIndex, endIndex);
  }
}
