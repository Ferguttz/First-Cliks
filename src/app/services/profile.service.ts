import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  StudentPrivateProfileDto,
  TutorPrivateProfileDto,
} from '../../services/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  getProfileTutor() {
    return this.http.get<TutorPrivateProfileDto>(
      `${environment.apiBase}/tutor/profile`
    );
  }

  getProfileStudent() {
    return this.http.get<StudentPrivateProfileDto>(
      `${environment.apiBase}/student/profile`
    );
  }
}
