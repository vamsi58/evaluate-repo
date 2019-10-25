import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit  {
  oDoc;
  sDefTxt;
  @ViewChild('switchMode',{static: false}) private checkInput;
  constructor() { }

  ngAfterViewInit(){
    this.oDoc = document.getElementById('textBox');
    this.sDefTxt = this.oDoc.innerHTML;
    if (this.checkInput.checked) {
      this.setDocMode(true);
    } 
  }
  
  formatDoc(sCmd, sValue) {
    if (this.validateMode()) { 
      document.execCommand(sCmd, false, sValue); 
      this.oDoc.focus(); }
  }
  
  validateMode() {
    if (!this.checkInput.checked) { 
      return true ; 
    }
    alert("Uncheck \"Show HTML\".");
    this.oDoc.focus();
    return false;
  }
  
  setDocMode(bToSource) {
    var oContent;
    if (bToSource) {
      oContent = document.createTextNode(this.oDoc.innerHTML);
      this.oDoc.innerHTML = "";
      var oPre = document.createElement("pre");
      this.oDoc.contentEditable = false;
      oPre.id = "sourceText";
      oPre.contentEditable = "true";
      oPre.appendChild(oContent);
      this.oDoc.appendChild(oPre);
      document.execCommand("defaultParagraphSeparator", false, "div");
    } else {
      if (document.all) {
        this.oDoc.innerHTML = this.oDoc.innerText;
      } else {
        oContent = document.createRange();
        oContent.selectNodeContents(this.oDoc.firstChild);
        this.oDoc.innerHTML = oContent.toString();
      }
      this.oDoc.contentEditable = true;
    }
    this.oDoc.focus();
  }

  hlink()
  {
    var sLnk=prompt('Write the URL here','http:\/\/');
    if(sLnk&&sLnk!=''&&sLnk!='http://')
    {
      this.formatDoc('createlink',sLnk)
    }
  }

  onSelectedTitle (event: any) {
    var selectedTitle = event.target.value;
    this.formatDoc('formatblock',selectedTitle);
  }

}
