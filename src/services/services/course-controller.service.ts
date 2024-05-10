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
import { get } from '../fn/course-controller/get';
import { Get$Params } from '../fn/course-controller/get';
import { getLast } from '../fn/course-controller/get-last';
import { GetLast$Params } from '../fn/course-controller/get-last';
import { PageCourse } from '../models/page-course';
import { paginate } from '../fn/course-controller/paginate';
import { Paginate$Params } from '../fn/course-controller/paginate';

@Injectable({ providedIn: 'root' })
export class CourseControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `paginate()` */
  static readonly PaginatePath = '/courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `paginate()` instead.
   *
   * This method doesn't expect any request body.
   */
  paginate$Response(params: Paginate$Params, context?: HttpContext): Observable<StrictHttpResponse<PageCourse>> {
    return paginate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `paginate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  paginate(params: Paginate$Params, context?: HttpContext): Observable<PageCourse> {
    return this.paginate$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageCourse>): PageCourse => r.body)
    );
  }

  /** Path part for operation `get()` */
  static readonly GetPath = '/courses/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get()` instead.
   *
   * This method doesn't expect any request body.
   */
  get$Response(params: Get$Params, context?: HttpContext): Observable<StrictHttpResponse<Course>> {
    return get(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `get$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get(params: Get$Params, context?: HttpContext): Observable<Course> {
    return this.get$Response(params, context).pipe(
      map((r: StrictHttpResponse<Course>): Course => r.body)
    );
  }

  /** Path part for operation `getLast()` */
  static readonly GetLastPath = '/courses/last';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLast()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLast$Response(params?: GetLast$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Course>>> {
    return getLast(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLast$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLast(params?: GetLast$Params, context?: HttpContext): Observable<Array<Course>> {
    return this.getLast$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Course>>): Array<Course> => r.body)
    );
  }

}
