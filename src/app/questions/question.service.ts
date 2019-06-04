import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, pipe } from "rxjs";
//import { map } from "rxjs/operators";
//import {map} from "rxjs/add/operator";

//import '...rxjs/add/operator/map';
//import './node_modules/rxjs/add/operator/map.js'

import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";

import { Question}  from "./question.model";
import { Answer } from './answer.model';



@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private authStatusListener = new Subject<boolean>();
  private questions: Question[] = [];
  private questionsUpdated = new Subject<{ questions: Question[]; questionCount: number }>();
  

  
  constructor(private http: HttpClient, private router: Router) { }

  getAuthStatusListener() {
   return this.authStatusListener.asObservable();
  }

  createQuestion (quesid: string, questype: string, quesCat: string, quesSubCat: string, question: string, quesFormatted: string, quesAnswers: Answer[], quesReason:string) {
    const Question: Question = { quesid: quesid, questype: questype, quesCat: quesCat, quesSubCat: quesSubCat, question: question, quesFormatted: quesFormatted, quesAnswers: quesAnswers, quesReason:quesReason };
    this.http
      .post("http://localhost:3000/api/question/add", Question)
      .subscribe(() => {
        this.router.navigate(["/"]);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  viewQuestion(questionsperpage :number, currentPage: number ){
  
    const queryParams = `?pagesize=${questionsperpage}&page=${currentPage}`;
   return  this.http
      .get<{ message: string; questions: any; maxQuestions: number }>(
        "http://localhost:3000/api/posts" + queryParams
      )
      .pipe(
        map(questionData => {
          return {
            questions: questionData.questions.map (question => {
              return {
                question: question.question,
                quesFormatted: question.quesFormatted
              
              };
            }),
            maxQuestions: questionData.maxQuestions
          };
        })
      )
      .subscribe(transformedQuestionData => {
        this.questions = transformedQuestionData.questions;
        this.questionsUpdated.next({
          questions: [...this.questions],
          questionCount: transformedQuestionData.maxQuestions
        });
      });
      
    }

  getQuestionUpdateListener() {
    return this.questionsUpdated.asObservable();
  }

  }



