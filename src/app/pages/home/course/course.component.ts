import { Component, OnInit, inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CourseControllerService } from '../../../../services/services';
import { ActivatedRoute } from '@angular/router';
import { CoursePublicDto } from '../../../../services/models';
import { Get$Params } from '../../../../services/fn/tutor-course-admin-controller/get';
import { GetCourse$Params } from '../../../../services/fn/course-controller/get-course';
import { map } from 'rxjs';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export default class CourseComponent implements OnInit {
  private courseService = inject(CourseControllerService);
  private route = inject(ActivatedRoute);

  course?: CoursePublicDto;

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      const params: GetCourse$Params = {
        courseId: parseInt(courseId),
      };
      let coursePublic: CoursePublicDto;

      this.courseService.getCourse(params).subscribe((course) => {
        console.log(course);
      });
    }
  }
}
