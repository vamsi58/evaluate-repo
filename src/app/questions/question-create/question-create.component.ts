import { Component, OnInit, AfterViewInit, ViewChild,ElementRef  } from '@angular/core';
import { Category } from '../category.model';
import { SubCategory } from '../sub-category.model';
import { QuestionType } from '../question-type.model';
import { SelectService } from '../select.service';
import {Answer} from '../answer.model';
import { NgForm } from "@angular/forms";
import { QuestionService } from "../question.service";
import { Complexity } from '../question-complex.model';


@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  oDoc;
  aDoc;
  sDefTxt;
  invalQues: boolean = false;
  objectiveQuestion = true;
  selectedCategory: Category = new Category(2, 'IBM i');
  categories: Category[];
  subCategories: SubCategory[];
  questionTypes: QuestionType[];
  complexities: Complexity[];

  answers: Answer[];
  selectedType:QuestionType = new QuestionType(2, "Objective");
  selectedCat:Category = new Category(2, "Technical");  
  selectedSubCat:SubCategory = new SubCategory(3,2, "IBM i");
  selectedComplexity:Complexity = new Complexity(1, "Level 1");
 
  constructor(private selectService: SelectService, private questionService: QuestionService) {
    
      this.answers = [];  
      this.addAnswer();
   }

  ngOnInit(){
    this.categories = this.selectService.getCategory();
    this.questionTypes = this.selectService.getQuestionType();
    this.onSelect(this.selectedCat.id);
    this.complexities = this.selectService.getComplexity();
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
      if (optionId == "2"){
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
      if (!this.customValid()) {
        return;
      }
      const questionType = this.selectService.getQuestionType().filter((item) => item.id == form.value.questype)[0].name;
      const category = this.selectService.getCategory().filter((item) => item.id == form.value.quesCat)[0].name;
      const subcategory = this.selectService.getSubCategory().filter((item) => item.id == form.value.quesSubCat)[0].name;
      const complexity = this.selectService.getComplexity().filter((item) => item.id == form.value.quesComplex)[0].name;
      var quesFormatted = this.oDoc.innerHTML;
      const question = this.oDoc.textContent;
      const answer   = this.aDoc.textContent;
      const approved = false;
      console.log(questionType,category,subcategory);
      this.questionService.createQuestion('dummyId','QTN0005', questionType,  category, subcategory, question, quesFormatted, this.answers, answer, approved, complexity);
      // close the modal
      this.closeModal();
  }

  customValid(): boolean {
    if (this.oDoc.textContent === ''){
      this.invalQues = true;
      return false;
    }
    return true;
}

closeModal(): void {
  this.closeBtn.nativeElement.click();
}
 
}
