import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Category } from '../category.model';
import { SubCategory } from '../sub-category.model';
import { QuestionType } from '../question-type.model';
import { SelectService } from '../select.service';
import {Answer} from '../answer.model';
import { Question } from '../question.model';
import { NgForm } from "@angular/forms";
import { QuestionService } from "../question.service";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {

  oDoc;
  aDoc;
  sDefTxt;
  objectiveQuestion = true;
  selectedCategory: Category = new Category(2, 'IBM i');
  categories: Category[];
  subCategories: SubCategory[];
  questionTypes: QuestionType[];
  isLoading = false;
  //question = Question;
  

  answers: Answer[];
  selectedType:QuestionType = new QuestionType(1, "Objective");
  selectedCat:Category = new Category(1, "Technical");  
  selectedSubCat:SubCategory = new SubCategory(1,1, "IBM i");

  quesid1 = "QTN0004";

  constructor(private selectService: SelectService, private questionService: QuestionService) { }

  ngOnInit() {

    // this.questionService.getQuestion(this.quesid1).subscribe(questionData => {
    //   this.isLoading = false;
    //   this.question = {
    //     quesid: questionData.quesid,
    //     title: postData.title,
    //     content: postData.content,
    //     imagePath: postData.imagePath,
    //     creator: postData.creator
    //   };
    //   this.form.setValue({
    //     title: this.post.title,
    //     content: this.post.content,
    //     image: this.post.imagePath
    //   });
    // });
  }

}
