import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TutorCourseAdminControllerService } from '../../../../services/services';
import { FormsModule, NgForm } from '@angular/forms';
import { CourseDto } from '../../../../services/models';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export default class CourseFormComponent {
  courseTutorAdmin = inject(TutorCourseAdminControllerService);
  router = inject(Router);
  errorMsg: Array<string> = [];

  techs: Array<string> = new Array<string>();

  createCourse: CourseDto = {
    coverPath: 'java.jpg',
    description: '',
    level: 'ENTRY',
    name: '',
    techStack: this.techs,
  };

  create(form: NgForm) {
    if (form.value.techStack1 != '') {
      this.techs.push(form.value.techStack1);
    }
    if (form.value.techStack2 != '') {
      this.techs.push(form.value.techStack1);
    }
    if (form.value.techStack3 != '') {
      this.techs.push(form.value.techStack1);
    }
    console.log(this.createCourse);
    this.courseTutorAdmin
      .create({
        body: this.createCourse,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        },
      });
  }
}
