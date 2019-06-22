import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Category } from '../category.model';
import { SubCategory } from '../sub-category.model';
import { QuestionType } from '../question-type.model';
import { SelectService } from '../select.service';
import {Answer} from '../answer.model';
import { NgForm } from "@angular/forms";
import { QuestionService } from "../question.service";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  oDoc;
  aDoc;
  sDefTxt;
  objectiveQuestion = true;
  selectedCategory: Category = new Category(2, 'IBM i');
  categories: Category[];
  subCategories: SubCategory[];
  questionTypes: QuestionType[];

  answers: Answer[];
  selectedType:QuestionType = new QuestionType(1, "Objective");
  selectedCat:Category = new Category(1, "Technical");  
  selectedSubCat:SubCategory = new SubCategory(1,1, "IBM i");

  constructor(private selectService: SelectService, private questionService: QuestionService) {

    this.answers = [];  
    this.addAnswer();
   }

  ngOnInit() {
  }
  // add an answer
  public addAnswer() : void {
    this.answers.push({
       optionNumber:this.answers.length+1,
       answerBody: " ",
       isCorrectAnswer: false
    });
}  

 // remove the answer
public removeAnswer( index: number ) : void {
    this.answers.splice( index, 1 );
    for (var idx = 0;  idx < this.answers.length; idx++)
    {
     this.answers[idx].optionNumber = idx+1;
    
    }
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

  
    //this.questionService.updateQuestion('QTN0004', questionType,  category, subcategory, question, quesFormatted, this.answers, answer);
  form.reset();
}

}
