import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, Courses } from "../../models/course";

@Injectable({ providedIn: 'root' })
export class CoursesService{
    constructor(private http: HttpClient)
    {}

    getCourses() : Observable<Courses> {
       return this.http.get<Courses>("http://api.wisey.app/api/v1/core/preview-courses");
    }

    getCourseById(id: string) : Observable<Course> {
       return this.http.get<Course>("http://api.wisey.app/api/v1/core/preview-courses"+ "/" + id);
    }
}