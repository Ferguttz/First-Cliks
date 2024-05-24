import { Component, OnInit, getPlatform, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TutorCourseAdminControllerService } from '../../../../services/services';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { CoursePublicDto } from '../../../../services/models';
import { CourseDto } from '../../../../services/models';
import { MediaService } from '../../../services/media.service';
import { ApiImgPipe } from '../../../shared/api-img.pipe';
import { Get$Params } from '../../../../services/fn/tutor-course-admin-controller/get';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [RouterModule, FormsModule, ApiImgPipe],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export default class CourseFormComponent implements OnInit {
  private courseTutorAdmin = inject(TutorCourseAdminControllerService);
  private mediaService = inject(MediaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);

  errors: string[] = [];
  course?: CourseDto;
  form?: FormGroup;

  techs: Array<string> = new Array<string>();

  createCourse: CourseDto = {
    coverPath: 'java.jpg',
    description: '',
    level: 'ENTRY',
    name: '',
    techStack: this.techs,
  };

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (courseId) {
    }
  }

  uplouadFile(event: any, control: string) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.mediaService.upload(formData).subscribe((response) => {
        this.form!.controls[control].setValue(response.path);
      });
    }
  }

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
          this.errors = err.error.validationErrors;
        },
      });
  }
}
