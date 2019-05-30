import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Category } from '../category.model';
import { SubCategory } from '../sub-category.model';
import { QuestionType } from '../question-type.model';
import { SelectService } from '../select.service';
import {Answer} from '../answer.model';
import { NgForm } from "@angular/forms";
import { QuestionService } from "../question.service";


@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements AfterViewInit, OnInit {
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

  ngOnInit(){
    this.categories = this.selectService.getCategory();
    this.questionTypes = this.selectService.getQuestionType();
    this.onSelect(this.selectedCat.id);
  }

 onSelect(categoryid) {
    this.subCategories = this.selectService.getSubCategory().filter((item) => item.categoryId == categoryid);
  }


  ngAfterViewInit() {
    this.oDoc = document.getElementById('questionBox');
    this.aDoc  = document.getElementById('answerBox');
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
      console.log(quesFormatted);
      this.questionService.createQuestion('QTN0001', questionType,  category, subcategory, question, quesFormatted, this.answers, answer);

  }

}
