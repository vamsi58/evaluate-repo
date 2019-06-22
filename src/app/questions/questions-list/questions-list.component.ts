import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";
import { Category } from '../category.model';
import { SubCategory } from '../sub-category.model';
import { QuestionType } from '../question-type.model';
import { SelectService } from '../select.service';
import { Answer } from '../answer.model';
import { QuestionService } from "../question.service";
import { Question } from '../question.model';
import { QuestionDeleteComponent } from '../question-delete/question-delete.component';
import { QuestionEditComponent } from '../question-edit/question-edit.component';
import { QuestionViewComponent } from '../question-view/question-view.component';
import { MatDialog } from '@angular/material';
import { ValueTransformer } from '@angular/compiler/src/util';
import { MatPaginator} from '@angular/material/paginator';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';


@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {
  oDoc;
  aDoc;
  sDefTxt;
  objectiveQuestion = true;
  categories: Category[];
  subCategories: SubCategory[];
  questionTypes: QuestionType[];
  selectedCategory: Category = new Category(2, 'IBM i');
  questions: Question[] = [];
  answers: Answer[];
  filteredQuestions: Question[] = [];
  isLoading = false;
  totalQuestions = 0;
  questionsPerPage = 4;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private questionsSub: Subscription;
  private _filterQuestion: string;
  private _filterSubCat: string;
  private filteredSubcat: string;


  get filterQuestion(): string {
    return this._filterQuestion;
  }

  set filterQuestion(value: string) {
    this._filterQuestion = value;
    this.filteredQuestions = this.filterQuestions(value);
  }

  filterQuestions(searchTerm: string) {
    return this.questions.filter(question =>
      question.question.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

  

  selectedType: QuestionType = new QuestionType(0, "All");
  selectedCat: Category = new Category(0, "All");
  selectedSubCat: SubCategory = new SubCategory(0, 0, "All");

  constructor( private selectService: SelectService,
              private questionService: QuestionService,
              private dialog: MatDialog) 
        { 

      this.answers = []; 
      
    }


    //----------------------to be seperated-----
    // defined the array of data
    //public data: string[] = ['cricket', 'hockey']; 
    data: SubCategory[] = [];
    
    // set placeholder to MultiSelect input element
    public placeholder: string = 'Select SubCategory';
    //set height to popup list
    public popupHeight:string = '200px';
    //set width to popup list
    public popupWidth:string = '250px';


  ngOnInit() {
    //this.objectiveQuestion = true;
    this.categories = this.selectService.getCategory();
    this.questionTypes = this.selectService.getQuestionType();
    this.onSelect(this.selectedCat.id);
    this.filteredSubcat = 'All';
    this.questionService.viewQuestion(this.questionsPerPage, this.currentPage,this.filteredSubcat);  
        this.questionsSub = this.questionService
      .getQuestionUpdateListener()
      .subscribe((questionData: { questions: Question[];  questionCount: number }) => {
        this.totalQuestions = questionData.questionCount;
        this.questions = questionData.questions;
        this.filteredQuestions = this.questions;
                     //this.answers = questionData.answers;
        console.log(questionData);
        //console.log(questionData.answers);
      });

  }

  onSelect(categoryid) {
    this.subCategories = this.selectService.getSubCategory().filter((item) => item.categoryId == categoryid);
    this.data = this.subCategories;
  }
  onSubCatSelect(value){
      
    this.filteredSubcat = (this.selectService.getSubCategory().filter((item) => item.id == value))[0].name;
    console.log(this.filteredSubcat);
    this.questionService.viewQuestion(this.questionsPerPage, this.currentPage, this.filteredSubcat);
    //this.filteredQuestions = this.questions.filter((question) =>question.quesSubCat == filteredSubcat);
  }

  // based on question type display subsequent fields
  onSelectQuestType(optionId: string) {
    if (optionId == "1") {
      this.objectiveQuestion = true;
    }
    else {
      this.objectiveQuestion = false;
    }
  }

  onChangedPage(pageData: PageEvent) {
    //this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.questionsPerPage = pageData.pageSize;
    this.questionService.viewQuestion(this.questionsPerPage, this.currentPage, this.filteredSubcat);
  }

  

  onDelete(questiondata) {
    //console.log(post.userId);  
    //Open MatDialog and load component dynamically  
    const dialogRef = this.dialog.open(QuestionDeleteComponent, {               //Pass data object as a second parameter  
      data: {
        question: questiondata
      }
    });
  }
    //Need to subscribe afterClosed event of MatDialog  
  //   dialogRef.afterClosed().subscribe(confirmresult => {
  //     console.log(confirmresult);
  //     if (confirmresult) {
  //       //if dialog result is yes, delete post  
  //       this.deleteQuestion(question.quesid);
  //       console.log("Delete confirm is approved by user.");
  //     } else {
  //       //if dialog result is no, DO NOT delete post  
  //       console.log("Delete confirm is cancelled by user.");
  //     }
  //   });
  // }


  onEdit(questiondata) {
    //console.log(post.userId);  
    console.log(questiondata);
    //Open MatDialog and load component dynamically  
    const dialogRef = this.dialog.open(QuestionEditComponent, {               //Pass data object as a second parameter  
      data: {
        question: questiondata
               
      }
    });
  }

   
  onView(questiondata) {  
      console.log(questiondata);
      //Open MatDialog and load component dynamically  
      const dialogRef = this.dialog.open(QuestionViewComponent, {               //Pass data object as a second parameter  
        data: {
          question: questiondata
                 
        }
      });
    }
    





    //  Multi Drop down
    
    //define the data with category
    public countries: { [key: string]: Object }[] = [
      { Name: 'Australia', Code: 'AU' },
      { Name: 'Bermuda', Code: 'BM' },
      { Name: 'Canada', Code: 'CA' },
      { Name: 'Cameroon', Code: 'CM' },
      { Name: 'Denmark', Code: 'DK' },
      { Name: 'France', Code: 'FR' },
      { Name: 'Finland', Code: 'FI' },
      { Name: 'Germany', Code: 'DE' },
      { Name: 'Greenland', Code: 'GL' },
      { Name: 'Hong Kong', Code: 'HK' },
      { Name: 'India', Code: 'IN' },
      { Name: 'Italy', Code: 'IT' },
      { Name: 'Japan', Code: 'JP' },
      { Name: 'Mexico', Code: 'MX' },
      { Name: 'Norway', Code: 'NO' },
      { Name: 'Poland', Code: 'PL' },
      { Name: 'Switzerland', Code: 'CH' },
      { Name: 'United Kingdom', Code: 'GB' },
      { Name: 'United States', Code: 'US' }
  ];

  public reorderObj: CheckBoxComponent;
  public mode: string;
  public filterPlaceholder: string;

  // map the groupBy field with category column
  public checkFields: Object = { text: 'Name', value: 'Code' };
  // set the placeholder to the MultiSelect input
  public checkWaterMark: string = 'Select countries';
  // set the MultiSelect popup height
  public popHeight: string = '350px';
  
}
