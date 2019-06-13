import { Component, OnInit, AfterViewInit, ViewChild, Inject, Optional } from '@angular/core';
import { Category } from '../category.model';
import { SubCategory } from '../sub-category.model';
import { QuestionType } from '../question-type.model';
import { SelectService } from '../select.service';
import {Answer} from '../answer.model';
import { Question } from '../question.model';
import { NgForm } from "@angular/forms";
import { QuestionService } from "../question.service";
import {MAT_DIALOG_DATA} from '@angular/material';  
import { MatDialog } from '@angular/material';

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

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any,
    private selectService: SelectService, 
    private questionService: QuestionService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {

    }

  onSubmit(form: NgForm, even:Event) {
    if (form.invalid) {
      return;
    } 
    
    event.preventDefault();
    const questionType = this.selectService.getQuestionType().filter((item) => item.id == form.value.questype)[0].name;
        const category = this.selectService.getCategory().filter((item) => item.id == form.value.questype)[0].name;
        const subcategory = this.selectService.getSubCategory().filter((item) => item.id == form.value.questype)[0].name;
        var quesFormatted = this.oDoc.innerHTML;
        const question = this.oDoc.textContent;
        const answer   = this.aDoc.textContent;
  
    
      this.questionService.updateQuestion('QTN0004', questionType,  category, subcategory, question, quesFormatted, this.answers, answer);
    form.reset();
  }

}
