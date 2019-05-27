import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Category } from '../category.model';
import { SubCategory } from '../sub-category.model';
import { QuestionType } from '../question-type.model';
import { SelectService } from '../select.service';
import {Answer} from '../answer.model';


@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements AfterViewInit, OnInit {
  oDoc;
  sDefTxt;
  objectiveQuestion = true;
  selectedCategory: Category = new Category(2, 'IBM i');
  categories: Category[];
  subCategories: SubCategory[];
  questionTypes: QuestionType[];


  public form: {
        answers: Answer[];
    };

  constructor(private selectService: SelectService) {
      const optionNumber = 1;
      this.form = {
            answers: []
        };

        // Add an initial answer form-entry.
        this.addAnswer(optionNumber);
   }

  ngOnInit(){
    this.categories = this.selectService.getCategory();
    this.questionTypes = this.selectService.getQuestionType();
    this.onSelect(this.selectedCategory.id);

    
  }

 onSelect(categoryid) {
    this.subCategories = this.selectService.getSubCategory().filter((item) => item.categoryId == categoryid);
  }


  ngAfterViewInit() {
    this.oDoc = document.getElementById('questionBox');
    this.sDefTxt = this.oDoc.innerHTML;
  }

  onFormatDoc(sCmd, sValue) {
      document.execCommand(sCmd, false, sValue);
      this.oDoc.focus();
  }

  onConvertToHtml() {
    var oContent;
    oContent = document.createTextNode(this.oDoc.innerHTML);
    console.log(oContent);
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
  public addAnswer(index: number) : void {
        this.form.answers.push({
           optionNumber:index,
           answerBody: " ",
           isCorrectAnswer: false
        });
    }

     // remove the answer
    public removeAnswer( index: number ) : void {
        this.form.answers.splice( index, 1 );
    }

    // based on question type display subsequent fields
    onSelectQuestType(optionId:number)
    {  
      if (optionId == 1){
        this.objectiveQuestion = true;
      }
      else{
        this.objectiveQuestion = false;
         console.log("Change executed in subjective"+this.objectiveQuestion);
      }
    }

}
