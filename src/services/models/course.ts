/* tslint:disable */
/* eslint-disable */
import { TechStack } from '../models/tech-stack';
import { Tutor } from '../models/tutor';
export interface Course {
  coverPath?: string;
  createdDate?: string;
  description?: string;
  id?: number;
  isActive?: boolean;
  level?: 'ENTRY' | 'INTERMEDIATE' | 'ADVANCE';
  name?: string;
  techStack?: Array<TechStack>;
  tutor?: Tutor;
  updatedDate?: string;
}
