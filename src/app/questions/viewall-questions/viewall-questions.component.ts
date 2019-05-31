import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Category } from '../category.model';
import { SubCategory } from '../sub-category.model';
import { QuestionType } from '../question-type.model';
import { SelectService } from '../select.service';
import {Answer} from '../answer.model';
import { NgForm } from "@angular/forms";
import { QuestionService } from "../question.service";
import { Question } from '../question.model';

@Component({
  selector: 'app-viewall-questions',
  templateUrl: './viewall-questions.component.html',
  styleUrls: ['./viewall-questions.component.css']
})
export class ViewallQuestionsComponent implements OnInit {

  oDoc;
  sDefTxt;
  selectedType; 
  selectedCat;
  selectedSubCat;
  objectiveQuestion = true;
  selectedCategory: Category = new Category(2, 'IBM i');
  categories: Category[];
  subCategories: SubCategory[];
  questionTypes: QuestionType[];
  questions: Question[] = [];
  isLoading = false;
  totalQuestions = 0;
  questionsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private questionsSub: Subscription;
  

  constructor(private selectService: SelectService, private questionService: QuestionService) { }

  
  ngOnInit(){
    this.categories = this.selectService.getCategory();
    this.questionTypes = this.selectService.getQuestionType();
    this.onSelect(this.selectedCategory.id);


    // this.questionService.viewQuestion().subscribe((data: Question[])=> {
    //   this.questions = data;
    //})

    this.questionService.viewQuestion(this.questionsPerPage, this.currentPage);
    this.questionsSub = this.questionService
      .getQuestionUpdateListener()
      .subscribe((questionData: { questions: Question[]; questionCount: number }) => {
        this.isLoading = false;
        this.totalQuestions = questionData.questionCount;
        this.questions = questionData.questions;
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

}
