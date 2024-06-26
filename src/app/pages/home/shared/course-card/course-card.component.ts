import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursePublicDto } from '../../../../../services/models';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent {
  @Input({ required: true }) course!: CoursePublicDto;

  sutdentStars(i: number) {
    return new Array(i);
  }

  blankStars(i: number) {
    let rest: number = 5 - i;
    return new Array(rest);
  }

  //studentStarsTrack = new Array(this.course.studentStars);
  // blankStars = new Array(5 - this.course.studentStars!);
}
