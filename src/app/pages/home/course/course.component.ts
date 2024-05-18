import { Component, OnInit } from '@angular/core';
import { CoursePublicDto } from '../../../../services/models';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export default class CourseComponent implements OnInit {
  course?: CoursePublicDto;

  ngOnInit(): void {}
}
