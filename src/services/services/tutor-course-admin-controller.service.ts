/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Course } from '../models/course';
import { list } from '../fn/tutor-course-admin-controller/list';
import { List$Params } from '../fn/tutor-course-admin-controller/list';

@Injectable({ providedIn: 'root' })
export class TutorCourseAdminControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `list()` */
  static readonly ListPath = '/tutor/courses/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list()` instead.
   *
   * This method doesn't expect any request body.
   */
  list$Response(params?: List$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Course>>> {
    return list(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `list$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list(params?: List$Params, context?: HttpContext): Observable<Array<Course>> {
    return this.list$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Course>>): Array<Course> => r.body)
    );
  }

}
