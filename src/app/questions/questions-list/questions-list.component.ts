import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";
import { Category } from '../category.model';
import { SubCategory } from '../sub-category.model';
import { QuestionType } from '../question-type.model';
import { SelectService } from '../select.service';
import { Answer} from '../answer.model';
import { QuestionService } from "../question.service";
import { Question } from '../question.model';
import {QuestionDeleteComponent} from '../question-delete/question-delete.component';
import { MatDialog } from '@angular/material'; 

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {
  oDoc;
  sDefTxt;
  objectiveQuestion = true;
  categories: Category[];
  subCategories: SubCategory[];
  questionTypes: QuestionType[];
  selectedCategory: Category = new Category(2, 'IBM i');
  questions: Question[] = [];
  filteredQuestions: Question[] = [];
  isLoading = false;
  totalQuestions = 0;
  questionsPerPage = 4;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private questionsSub: Subscription;
  private _filterQuestion:string;

  get filterQuestion():string{
    return this._filterQuestion;
  }

  set filterQuestion(value:string){
    this._filterQuestion=value;
    this.filteredQuestions = this.filterQuestions(value);
  }

  filterQuestions(searchTerm:string){
    return this.questions.filter(question =>
    question.question.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1);
  }

  selectedType:QuestionType = new QuestionType(1, "Objective");
  selectedCat:Category = new Category(1, "All");  
  selectedSubCat:SubCategory = new SubCategory(1,1, "All");
  

  constructor(
    private selectService: SelectService, 
    private questionService: QuestionService, 
    private dialog: MatDialog ) {}
  

  ngOnInit(){
    this.categories = this.selectService.getCategory();
    this.questionTypes = this.selectService.getQuestionType();
    this.onSelect(this.selectedCat.id);
    this.questionService.viewQuestion(this.questionsPerPage, this.currentPage);
    this.questionsSub = this.questionService
      .getQuestionUpdateListener()
      .subscribe((questionData: { questions: Question[]; questionCount: number }) => {
        this.totalQuestions = questionData.questionCount;
        this.questions = questionData.questions;
        this.filteredQuestions = this.questions;
      });      
    
  }

 onSelect(categoryid) {
    this.subCategories = this.selectService.getSubCategory().filter((item) => item.categoryId == categoryid);
  }

  // based on question type display subsequent fields
  onSelectQuestType(optionId:string)
  {  
    if (optionId == "1"){
      this.objectiveQuestion = true;
    }
    else{
      this.objectiveQuestion = false;
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.questionsPerPage = pageData.pageSize;
    this.questionService.viewQuestion(this.questionsPerPage, this.currentPage);
  }

  private deleteQuestion(quesid: string) {
    //console.log(quesid);
    this.isLoading = true;
    this.questionService.deleteQuestion(quesid).subscribe(() => {
      this.questionService.viewQuestion(this.questionsPerPage, this.currentPage);
    });
  }

  onDelete(question) {  
    //console.log(post.userId);  
    //Open MatDialog and load component dynamically  
    const dialogRef = this.dialog.open(QuestionDeleteComponent, {               //Pass data object as a second parameter  
      data: {  
        question_name: question.question  
      }  
    });  
    //Need to subscribe afterClosed event of MatDialog  
    dialogRef.afterClosed().subscribe(confirmresult => {  
      console.log(confirmresult);  
      if (confirmresult) {  
        //if dialog result is yes, delete post  
        this.deleteQuestion(question.quesid);  
        console.log("Delete confirm is approved by user.");  
      } else {  
        //if dialog result is no, DO NOT delete post  
        console.log("Delete confirm is cancelled by user.");  
      }  
    });  
  }  
}
