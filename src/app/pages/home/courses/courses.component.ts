import { Component, OnInit, inject } from '@angular/core';
import { CoursePublicDto, Pageable } from '../../../../services/models';
import { CourseControllerService } from '../../../../services/services';
import { Paginate1$Params } from '../../../../services/fn/course-controller/paginate-1';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export default class CoursesComponent implements OnInit {
  private courseService = inject(CourseControllerService);

  courses: CoursePublicDto[] = [];

  pageable: Pageable = {
    page: 1,
    size: 5,
    sort: Array<string>('name'),
  };

  params: Paginate1$Params = {
    pageable: this.pageable,
  };

  ngOnInit(): void {
    this.courseService
      .paginate1$Response(this.params)
      .subscribe((coursePage) => {
        console.log(coursePage);
      });

    this.courseService.getLast().subscribe((coursePage) => {
      console.log(coursePage);
    });
  }
}
