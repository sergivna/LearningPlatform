import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courses } from "../../models/course";
import { CourseDetails } from "../../models/courseDetails";
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CoursesService{
   private api = {
      courses: 'core/preview-courses',    
   }

    constructor(private http: HttpClient)
    {}

    getCourses() : Observable<Courses> {
       return this.http.get<Courses>(`${environment.baseURL}/${environment.apiURL}/${this.api.courses}`);
    }

    getCourseById(id: string) : Observable<CourseDetails> {
       return this.http.get<CourseDetails>(`${environment.baseURL}/${environment.apiURL}/${this.api.courses}`+ "/" + id);
    }
}