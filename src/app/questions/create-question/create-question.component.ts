import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Category } from '../category.model';
import { SubCategory } from '../sub-category.model';
import { QuestionType } from '../question-type.model';
import { SelectService } from '../select.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements AfterViewInit, OnInit {
  oDoc;
  sDefTxt;
  selectedCategory: Category = new Category(2, 'IBM i');
  categories: Category[];
  subCategories: SubCategory[];
  questionTypes: QuestionType[];

  constructor(private selectService: SelectService) { }

  ngOnInit(){
    this.categories = this.selectService.getCategory();
    this.questionTypes = this.selectService.getQuestionType();
    this.onSelect(this.selectedCategory.id);
  }

 onSelect(categoryid) {
    this.subCategories = this.selectService.getSubCategory().filter((item) => item.categoryId == categoryid);
  }

  // onSelectType(categoryid) {
  //   this.questionTypes = this.selectService.getQuestionType();
  // }


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

}
