import { Component, OnInit, inject } from '@angular/core';
import { CoursePublicDto } from '../../../../services/models';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export default class CourseComponent implements OnInit {
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);

  course?: CoursePublicDto;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.courseService.getById(id).subscribe((course) => {
      this.course = course;
    });
  }
}
