import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { SubCategory } from './sub-category.model';
import { QuestionType } from './question-type.model';
import { Complexity } from './question-complex.model';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor() { }

   getQuestionType() {
    return [
     new QuestionType(1, 'Objective' ),
     new QuestionType(2, 'Descriptive' )
    ];
  }

  getCategory() {
    return [
     new Category(1, 'Technical' ),
     new Category(2, 'Functional' )
    ];
  }
  
  getSubCategory() {
   return [
     new SubCategory(1, 1, 'IBM i' ),
     new SubCategory(2, 1, 'Java' ),
     new SubCategory(3, 1, '.Net'),
     new SubCategory(4, 1, 'Angular'),
     new SubCategory(5, 2, 'Supply Chain' ),
     new SubCategory(6, 2, 'Logistics'),
     new SubCategory(7, 2, 'Operations' )
    ];
  }

  getComplexity() {
    return [
      new Complexity(1, 'Level 1' ),
      new Complexity(2, 'Level 2' ),
      new Complexity(3, 'Level 3' )
      ];
   }


}
