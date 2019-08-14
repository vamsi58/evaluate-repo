import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Category } from './category.model';
import { SubCategory } from './sub-category.model';
import { QuestionType } from './question-type.model';
import { Complexity } from './question-complex.model';
import { CompetenceArea } from './competence-area.model';
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
  private questionTypesUpdated = new Subject<{ questionTypes: QuestionType[] }>();
  private competenceAreas: CompetenceArea[] = [];
  private competenceAreasUpdated = new Subject<{ competenceAreas: CompetenceArea[] }>();
  private maxid: number;


  constructor(private http: HttpClient, private router: Router) { }

  //Add QuestionType
  addQuestionType(id: number, name: string) {
    const QuestionType: QuestionType = { id: id, name: name };

    console.log(QuestionType);

    this.http
      .post("http://localhost:3000/api/questiontype/add", QuestionType)
      .subscribe(() => {
        this.router.navigate(["/questions"]);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

    //Get all QuestionTypes
  getQuestionType() {
    //return [
    //  new QuestionType(1, 'All' ),
    //  new QuestionType(2, 'Objective' ),
    //  new QuestionType(3, 'Descriptive' )
    //]

    return this.http
      .get<{  message: string; questionTypes: any; }>("http://localhost:3000/api/questiontype/view")
      .pipe(
        map(questionTypeData => {
          //console.log("I am in Select Service");
          console.log(questionTypeData);  
          return {
            questionTypes: questionTypeData.questionTypes.map(Qtypes => {
              return {
                id: Qtypes.questionTypeid,
                name: Qtypes.questionTypename
              };
            }),
          };
        })
      )
      .subscribe(transformedQuestionTypeData => {
        this.questionTypes = transformedQuestionTypeData.questionTypes;
        this.questionTypesUpdated.next({
          questionTypes: [...this.questionTypes]
        });
      });

  }
  getQuestionTypeUpdateListener() {
    return this.questionTypesUpdated.asObservable();
  }

  getQtypeMaxid() {
    
    return this.http.get<{_id: string; maxId: number;}>("http://localhost:3000/api/questiontype/getMaxid");

  }


  //Add Competence Area
  addCompetenceArea(id: number, name: string) {
    const CompetenceArea: CompetenceArea = { id: id, name: name };

     console.log("I am in Select Service-Competence Add");

    console.log(CompetenceArea);

    this.http
      .post("http://localhost:3000/api/competencearea/add", CompetenceArea)
      .subscribe(() => {
        this.router.navigate(["/questions"]);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  //Get Competence areas/Categories 

  getCompetenceArea() {
    
    return this.http
      .get<{  message: string; competenceAreas: any; }>("http://localhost:3000/api/competencearea/view") 
      .pipe(
        map(competenceAreaData => {
          console.log("I am in Select Service");
          console.log(competenceAreaData);  
          return {
            competenceAreas: competenceAreaData.competenceAreas.map(Careas => {
              return {
                id: Careas.competenceid,
                name: Careas.competencename
              };
            }),
          };
        })
      )
      .subscribe(transformedCompetenceAreaData => {
        this.competenceAreas = transformedCompetenceAreaData.competenceAreas;
        this.competenceAreasUpdated.next({
          competenceAreas: [...this.competenceAreas]
        });
      });

  }
  getCompetenceAreaUpdateListener() {
    return this.competenceAreasUpdated.asObservable();
  }

  getCareaMaxid() {
    
    return this.http.get<{_id: string; maxId: number;}>("http://localhost:3000/api/competencearea/getMaxid");

  }


  // getCategory() {
  //   return [
  //     new Category(1, 'All'),
  //     new Category(2, 'Technical'),
  //     new Category(3, 'Functional')
  //   ];
  // }

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
      new Complexity(1, 'High'),
      new Complexity(2, 'Medium'),
      new Complexity(3, 'Low')
    ];
  }


}
