import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Category } from './category.model';
import { SubCategory } from './sub-category.model';
import { QuestionType } from './question-type.model';
import { Complexity } from './question-complex.model';
import { Subject, pipe } from "rxjs";

import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  private authStatusListener = new Subject<boolean>();
  private questionTypes: QuestionType[] = [];
  private questionTypesUpdated = new Subject<{ questiontypes: QuestionType[] }>();

  constructor(private http: HttpClient, private router: Router) { }

  //Add QuestionType
  addQuestionType(id: number, name: string) {
    const QuestioType: QuestionType = { id: id, name: name };

    this.http
      .post("http://localhost:3000/api/questiontype/add", QuestionType)
      .subscribe(() => {
        this.router.navigate(["/questions"]);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  getQuestionType() {
    //return [
    //  new QuestionType(1, 'All' ),
    //  new QuestionType(2, 'Objective' ),
    //  new QuestionType(3, 'Descriptive' )
    //]

    return this.http
      .get<{ questionTypes: any; }>("http://localhost:3000/api/questiontype/view")
      .pipe(
        map(questionTypeData => {
          return {
            questionTypes: questionTypeData.questionTypes.map(Qtypes => {
              return {
                id: Qtypes.id,
                name: Qtypes.name
              };
            }),
          };
        })
      )
      .subscribe(transformedQuestionTypeData => {
        this.questionTypes = transformedQuestionTypeData.questionTypes;
        this.questionTypesUpdated.next({
          questiontypes: [...this.questionTypes]
        });
      });

  }
  getQuestionTypeUpdateListener() {
    return this.questionTypesUpdated.asObservable();
  }

  getCategory() {
    return [
      new Category(1, 'All'),
      new Category(2, 'Technical'),
      new Category(3, 'Functional')
    ];
  }

  getSubCategory() {
    return [
      new SubCategory(1, 1, 'All'),
      new SubCategory(2, 2, 'All'),
      new SubCategory(3, 2, 'IBM i'),
      new SubCategory(4, 2, 'Java'),
      new SubCategory(5, 2, '.Net'),
      new SubCategory(6, 2, 'Angular'),
      new SubCategory(7, 3, 'All'),
      new SubCategory(8, 3, 'Supply Chain'),
      new SubCategory(9, 3, 'Logistics'),
      new SubCategory(8, 3, 'Operations')
    ];
  }

  getComplexity() {
    return [
      new Complexity(1, 'Level 1'),
      new Complexity(2, 'Level 2'),
      new Complexity(3, 'Level 3')
    ];
  }


}
