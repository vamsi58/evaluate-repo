import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements AfterViewInit {
  oDoc;
  sDefTxt;

  constructor() { }

  ngAfterViewInit() {
    this.oDoc = document.getElementById('questionBox');
    this.sDefTxt = this.oDoc.innerHTML;
  }

  formatDoc(sCmd, sValue) {
      document.execCommand(sCmd, false, sValue);
      this.oDoc.focus();
  }

  convertToHtml() {
    var oContent;
    oContent = document.createTextNode(this.oDoc.innerHTML);
    console.log(oContent);
  }

  onSelectedStyle(event: any, style: string) {
    var selectedValue = event.target.value;
    this.formatDoc(style, selectedValue);
  }

  hlink() {
    var sLnk = prompt('Write the URL here', 'http:\/\/');
    if (sLnk && sLnk != '' && sLnk != 'http://') {
      this.formatDoc('createlink', sLnk)
    }
  }

}
