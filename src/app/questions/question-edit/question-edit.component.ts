import { Component, OnInit, AfterViewInit, ViewChild, Inject, ElementRef } from '@angular/core';
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
  @ViewChild('closeBtn') closeBtn: ElementRef;
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
     @Inject(MAT_DIALOG_DATA) public data:any,
    private selectService: SelectService, 
    private questionService: QuestionService,
    private dialog: MatDialog
    ) { 
      
      this.answers = data.question.quesAnswers;
      this.addAnswer();
    }

  ngOnInit() {
    this.objectiveQuestion = true;
    console.log(this.data.question);
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

ngAfterViewInit() {
  this.oDoc = document.getElementById('questionBoxEdit');
  this.aDoc  = document.getElementById('answerBoxEdit');
  this.sDefTxt = this.oDoc.innerHTML;
}

onFormatDoc(sCmd, sValue) {
    document.execCommand(sCmd, false, sValue);
    this.oDoc.focus();
}

onConvertToHtml() {
  var oContent;
  oContent = document.createTextNode(this.oDoc.innerHTML);
}

onSelectedStyle(event: any, style: string) {
  var selectedValue = event.target.value;
  this.onFormatDoc(style, selectedValue);
}

onHlink() {
  var sLnk = prompt('Write the URL here', 'http:\/\/');
  if (sLnk && sLnk != '' && sLnk != 'http://') {
    this.onFormatDoc('createlink', sLnk)
  }
}

  onSubmit(form: NgForm, even:Event) {
      
    if (form.invalid) {   
      return;
    } 
     
    event.preventDefault();
 
    const id = this.data.question.id;
    const quesid = this.data.question.quesid;
    const questionType = this.data.question.questype;
    const category = this.data.question.quesCat;
    const subcategory = this.data.question.quesSubCat;
    
    

    var quesFormatted = this.oDoc.innerHTML;
    const questionName = this.oDoc.textContent;
    const answer   = this.aDoc.textContent;

    this.questionService.updateQuestion(id, quesid, questionType,  category, subcategory, questionName, quesFormatted, this.answers, answer);
   
  
  }

}
