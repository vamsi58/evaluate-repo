import { Component, OnInit, OnChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";
//import { Category } from '../category.model';
//import { SubCategory } from '../sub-category.model';
import { Course } from '../course.model';
import { QuestionType } from '../question-type.model';
import { CompetenceArea } from '../competence-area.model';  // Category is replaced with CompetenceArea
import { SelectService } from '../select.service';
import { Answer } from '../answer.model';
import { QuestionService } from "../question.service";
import { Question } from '../question.model';
import { QuestionCreateComponent } from '../question-create/question-create.component';
import { QuestionDeleteComponent } from '../question-delete/question-delete.component';
import { QuestionEditComponent } from '../question-edit/question-edit.component';
import { QuestionViewComponent } from '../question-view/question-view.component';
import { MatDialog } from '@angular/material';
import { ValueTransformer } from '@angular/compiler/src/util';
import { MatPaginator } from '@angular/material/paginator';
import { AutoCompleteComponent, ChangeEventArgs, MultiSelectChangeEventArgs as DropDownSelectEventArgs, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { Item } from '@syncfusion/ej2-splitbuttons';


@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit, OnChanges {
  oDoc;
  aDoc;
  sDefTxt;
  objectiveQuestion = true;
  //categories: Category[];
  competenceAreas: CompetenceArea[]
  //subCategories: SubCategory[];
  courses: Course[];
  questionTypes: QuestionType[];
  //selectedCategory: Category = new Category(1, 'All');
  selectedCompetence: CompetenceArea = new CompetenceArea(1, 'All');
  questions: Question[] = [];
  answers: Answer[];
  filteredQuestions: Question[] = [];
  isLoading = false;
  totalQuestions = 0;
  questionsPerPage = 4;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private questionsSub: Subscription;
  private questiontypesSub: Subscription;
  private competenceAreasSub: Subscription;
  private coursesSub: Subscription;
  private _filterQuestion: string;
  private filteredType: string;
  private filteredCat: string;
  private filteredSubcat: string;
  private filteredCats: string[];
  private filteredSubcats: string[];

  @ViewChild('questionForm') createForm: NgForm;
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
  //selectedCat: Category = new Category(0, "All");
  //selectedSubCat: SubCategory = new SubCategory(0, 0, "All");

  constructor(private selectService: SelectService,
    private questionService: QuestionService,
    private dialog: MatDialog) {

    this.answers = [];
    this.filteredSubcats = [];

  }

  //----------------------to be seperated-----
  // defined the array of data

  //public data: SubCategory[] = [];

  public multiselectfield: Object = { text: 'name', value: 'id' };

  // set placeholder to MultiSelect input element
  public placeholder: string = 'Select Course';
  //set height to popup list
  public popupHeight: string = '200px';
  //set width to popup list
  public popupWidth: string = '250px';


  ngOnInit() {
    //this.categories = this.selectService.getCategory(); 
    // this.questionTypes = this.selectService.getQuestionType();
    //this.loadSubCategories(this.selectedCat.id);
    this.selectService.getCompetenceArea();
    this.competenceAreasSub = this.selectService
      .getCompetenceAreaUpdateListener()
      .subscribe((competenceAreaData: { competenceAreas: CompetenceArea[]; }) => {
        this.competenceAreas = competenceAreaData.competenceAreas;
      });

    //this.subCategories = this.selectService.getSubCategory().filter((item) => item.categoryId == this.selectedCompetence.id);
    this.filteredType = 'All';
    this.filteredCat = 'All';
    this.filteredSubcat = 'All';
    this.filteredSubcats = [];
    this.filteredCats = [];
    this.questionService.viewQuestion(
      this.questionsPerPage,
      this.currentPage,
      this.filteredType,
      this.filteredCats,
      this.filteredSubcats);
    this.questionsSub = this.questionService
      .getQuestionUpdateListener()
      .subscribe((questionData: { questions: Question[]; questionCount: number }) => {
        this.totalQuestions = questionData.questionCount;
        this.questions = questionData.questions;
        this.filteredQuestions = this.questions;

      });

    this.selectService.getQuestionType();
    this.questiontypesSub = this.selectService
      .getQuestionTypeUpdateListener()
      .subscribe((questionTypeData: { questionTypes: QuestionType[]; }) => {
        this.questionTypes = questionTypeData.questionTypes;
      });


  }

  ngOnChanges() {
    // if (this.isReset) {
    console.log('test Anuradha');
    this.createForm.reset();
    // }
  }

  // loadSubCategories(categoryid) {

  // this.subCategories = this.selectService.getSubCategory().filter((item) => item.categoryId == categoryid);

  // }

  loadCourses(args: DropDownSelectEventArgs): void {
    console.log(args.value);
    //this.subCategories = [];
    for (let competenceid of args.value) {

      this.filteredCats.push((this.competenceAreas.filter((item) => item.id == competenceid))[0].name);
      //this.subCategories = this.subCategories.concat(this.selectService.getSubCategory().filter((item) => item.categoryId == competenceid));
      //this.courses = this.courses.concat(this.selectService.getCourse(competenceid).filter((item)=> item.categoryId==competenceid));
      if (competenceid > 0) {
        this.selectService.getCourse(competenceid);
        this.coursesSub = this.selectService
          .getCourseUpdateListener()
          .subscribe((courseData: { courses: Course[]; }) => {
            this.courses = courseData.courses;
            
                   });
      }

    }

    console.log(this.courses);
  }

  public onCourseSelect(args: DropDownSelectEventArgs): void {
    console.log(args.value);
    for (let courseid of args.value) {

      //this.filteredSubcats.push((this.selectService.getSubCategory().filter((item) => item.id == subcatId))[0].name);
      this.filteredSubcats.push((this.courses.filter((item) => item.id == courseid))[0].name);

    }

    this.questionService.viewQuestion(this.questionsPerPage, this.currentPage, this.filteredType,
      this.filteredCats, this.filteredSubcats);



  }

  //onSubCatSelect(value) {  Old code, -----need to be deleted-----
  //   this.filteredCat = (this.selectService.getCategory().filter((item) => item.id == this.selectedCat.id))[0].name;
  //   this.filteredSubcat = (this.selectService.getSubCategory().filter((item) => item.id == value))[0].name;
  //   //this.questionService.viewQuestion(this.questionsPerPage, this.currentPage, this.filteredType,
  //     //this.filteredCat, this.filteredSubcat);

  // }
  // based on question type display subsequent fields
  onSelectQuestType(optionId) {
    this.filteredType = (this.questionTypes.filter((item) => item.id == optionId))[0].name;
    if (optionId == 1) {
      this.objectiveQuestion = true;
    }
    else {
      this.objectiveQuestion = false;
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.questionsPerPage = pageData.pageSize;
    this.questionService.viewQuestion(
      this.questionsPerPage,
      this.currentPage,
      this.filteredType,
      this.filteredCats,
      this.filteredSubcats);
  }

  onAdd() {
    //Open MatDialog and load component dynamically  
    const dialogRef = this.dialog.open(QuestionCreateComponent, {               //Pass data object as a second parameter  
      data: {

      }
    });
  }
  onDelete(questiondata) {
    //Open MatDialog and load component dynamically  
    const dialogRef = this.dialog.open(QuestionDeleteComponent, {               //Pass data object as a second parameter  
      data: {
        question: questiondata
      }
    });
  }

  onEdit(questiondata) {
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


}
