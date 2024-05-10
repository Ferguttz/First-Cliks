/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Course } from '../../models/course';

export interface GetLast$Params {
}

export function getLast(http: HttpClient, rootUrl: string, params?: GetLast$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Course>>> {
  const rb = new RequestBuilder(rootUrl, getLast.PATH, 'get');
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

getLast.PATH = '/courses/last';
