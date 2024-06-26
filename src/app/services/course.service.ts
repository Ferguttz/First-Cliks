import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CoursePublicDto, PageCoursePublicDto } from '../../services/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);

  getLastCourses() {
    return this.http.get<CoursePublicDto[]>(
      `${environment.apiBase}/courses/last`
    );
  }

  paginate(size: number = 5, page: number = 0) {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'name');

    return this.http.get<PageCoursePublicDto>(`${environment.apiBase}/courses`);
  }

  getById(id: string) {
    return this.http.get<CoursePublicDto>(
      `${environment.apiBase}/courses/${id}`
    );
  }
}
