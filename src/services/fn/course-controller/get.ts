/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Course } from '../../models/course';

export interface Get$Params {
  name: string;
}

export function get(http: HttpClient, rootUrl: string, params: Get$Params, context?: HttpContext): Observable<StrictHttpResponse<Course>> {
  const rb = new RequestBuilder(rootUrl, get.PATH, 'get');
  if (params) {
    rb.path('name', params.name, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Course>;
    })
  );
}

get.PATH = '/courses/{name}';
