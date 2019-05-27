import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { Question}  from "./question.model";
import { Answer } from './answer.model';



@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private authStatusListener = new Subject<boolean>();

  
  constructor(private http: HttpClient, private router: Router) { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createQuestion (quesid: string, questype: string, quesCat: string, quesSubCat: string, question: string, quesFormatted: string, quesAnswers: Answer[]) {
    const Question: Question = { quesid: quesid, questype: questype, quesCat: quesCat, quesSubCat: quesSubCat, question: question, quesFormatted: quesFormatted, quesAnswers: quesAnswers };
    
    this.http
      .post("http://localhost:3000/api/Question/add", Question)
      .subscribe(() => {
        this.router.navigate(["/"]);
      }, error => {
        this.authStatusListener.next(false);
      });
  }
}


