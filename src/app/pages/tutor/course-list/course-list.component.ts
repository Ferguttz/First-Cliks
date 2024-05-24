import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseCardComponent } from '../../home/shared/course-card/course-card.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export default class CourseListComponent {}
