/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Course } from '../../models/course';

export interface List$Params {
}

export function list(http: HttpClient, rootUrl: string, params?: List$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Course>>> {
  const rb = new RequestBuilder(rootUrl, list.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Course>>;
    })
  );
}

list.PATH = '/tutor/courses/list';
