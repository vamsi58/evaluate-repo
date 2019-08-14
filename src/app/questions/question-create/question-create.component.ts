import { Component, OnInit, AfterViewInit, ViewChild,ElementRef  } from '@angular/core';
import { Category } from '../category.model';
import { SubCategory } from '../sub-category.model';
import { QuestionType } from '../question-type.model';
import { CompetenceArea } from '../competence-area.model';
import { SelectService } from '../select.service';
import { Subscription } from "rxjs";
import {Answer} from '../answer.model';
import { NgForm } from "@angular/forms";
import { QuestionService } from "../question.service";
import { Complexity } from '../question-complex.model';
import { MatDialog } from '@angular/material';
import {QuestionTypeComponent} from '../question-type/question-type.component';
import {CompetenceareaComponent} from '../competencearea/competencearea.component';


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
  objectiveQuestion:boolean = true;
  invalQues: boolean;
  invalAnsd: boolean;
  invalAnso: boolean;
  invalAnsc: boolean;
  
  categories: Category[];
  competenceAreas: CompetenceArea[];
  subCategories: SubCategory[];
  questionTypes: QuestionType[];
  complexities: Complexity[];
  answers: Answer[];

  //selectedCategory: Category;
  selectedCompetence: CompetenceArea;
  selectedType: QuestionType;;
  //selectedCat:Category;  
  selectedSubCat:SubCategory;
  selectedComplexity:Complexity;

  private questiontypesSub: Subscription;
  private competenceareasSub: Subscription;
 
  constructor(private selectService: SelectService, 
    private questionService: QuestionService,
    private dialog: MatDialog) 
    {
    this.answers = [];  
    this.addAnswer();
   }

  ngOnInit(){
    this.init();
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
      if (!this.customValid()) {
        return;
      }
      const questionType = this.questionTypes.filter((item) => item.id == form.value.questype)[0].name;
      //const category = this.selectService.getCategory().filter((item) => item.id == form.value.quesCat)[0].name;
      const competence = this.competenceAreas.filter((item) => item.id == form.value.quesCat)[0].name;
      const subcategory = this.selectService.getSubCategory().filter((item) => item.id == form.value.quesSubCat)[0].name;
      const complexity = this.selectService.getComplexity().filter((item) => item.id == form.value.quesComplex)[0].name;
      var quesFormatted = this.oDoc.innerHTML;
      const question = this.oDoc.textContent;
      const answer   = this.aDoc.textContent;
      const approved = false;
      console.log(questionType,competence,subcategory);
      this.questionService.createQuestion('dummyId','QTN0005', questionType,  competence, subcategory, question, quesFormatted, this.answers, answer, approved, complexity);
      // close the modal
      this.closeModal(form);
  }

  customValid(): boolean {
    this.invalQues = false;
    this.invalAnsd = false;
    this.invalAnso = false;
    this.invalAnsc = false;
    
    if (this.oDoc.textContent === ''){                   
      this.invalQues = true;
      return false;
    }
    if (this.oDoc.textContent.length <= 9){             // question should be minimum 10 characters
      this.invalQues = true;
      return false;
    }
    if (this.objectiveQuestion == true && this.answers.length !== 4){  // 4 answers needed for objective question
      this.invalAnso = true;
      return false;
    }
    if (this.objectiveQuestion == true && (this.answers.findIndex(a => a.isCorrectAnswer === true)) < 0 ) {                    // one answer should be correct answer for objective 
      this.invalAnsc = true;
      return false;
    }
    if (this.objectiveQuestion == false && this.aDoc.textContent === ''){
      this.invalAnsd = true;
      return false;
    }
    return true;
}

closeModal(form:NgForm): void {
  this.closeBtn.nativeElement.click();
  form.resetForm();
  this.init();
}

//To be removed
init() {
  console.log("I am init");
  //this.selectedCategory = new Category(2, 'IBM i');
    this.selectedType = new QuestionType(1, "Objective");
  //this.selectedCat = new Category(2, "Technical");  
  this.selectedCompetence = new CompetenceArea(2, "Technical");
  this.selectedSubCat = new SubCategory(3,2, "IBM i");
  this.selectedComplexity = new Complexity(1, "Level 1");
  //this.categories = this.selectService.getCategory();
  //this.questionTypes = this.selectService.getQuestionType();
  this.selectService.getQuestionType();
  this.questiontypesSub = this.selectService
  .getQuestionTypeUpdateListener()
  .subscribe((questionTypeData: {questionTypes: QuestionType[]; }) => {
    this.questionTypes = questionTypeData.questionTypes;
  });
  console.log(this.questionTypes);

  this.selectService.getCompetenceArea();
  this.competenceareasSub = this.selectService
  .getCompetenceAreaUpdateListener()
  .subscribe((competenceAreaData: {competenceAreas: CompetenceArea[]; }) => {
    this.competenceAreas = competenceAreaData.competenceAreas;
  });

  console.log(this.competenceAreas);

  //this.onSelect(this.selectedCat.id);
  this.onSelect(this.selectedCompetence.id);
  this.complexities = this.selectService.getComplexity();
  this.oDoc.innerHTML = '';
  this.oDoc.textContent = '';
  this.aDoc.textContent = '';
  this.invalQues = false;
  this.invalAnsd = false;
  this.invalAnso = false;
  this.invalAnsc = false;
  this.objectiveQuestion = true;
  this.answers = [];  
  this.addAnswer();
 
}

addQuestionType(){
    //Open MatDialog and load component dynamically  
    const dialogRef = this.dialog.open(QuestionTypeComponent);

}

addCompetenceArea(){
  //Open MatDialog and load component dynamically  
  const dialogRef = this.dialog.open(CompetenceareaComponent);

}

}
