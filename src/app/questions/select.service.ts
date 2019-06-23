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
     new QuestionType(1, 'All' ),
     new QuestionType(2, 'Objective' ),
     new QuestionType(3, 'Descriptive' )
    ];
  }

  getCategory() {
    return [
     new Category(1, 'All' ), 
     new Category(2, 'Technical' ),
     new Category(3, 'Functional' )
    ];
  }
  
  getSubCategory() {
   return [
     new SubCategory(1, 1, 'All' ),
     new SubCategory(2, 2, 'All' ),
     new SubCategory(3, 2, 'IBM i' ),
     new SubCategory(4, 2, 'Java' ),
     new SubCategory(5, 2, '.Net'),
     new SubCategory(6, 2, 'Angular'),
     new SubCategory(7, 3, 'All' ),
     new SubCategory(8, 3, 'Supply Chain' ),
     new SubCategory(9, 3, 'Logistics'),
     new SubCategory(8, 3, 'Operations' )
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
