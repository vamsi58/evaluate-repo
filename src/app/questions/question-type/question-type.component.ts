import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { SelectService } from '../select.service';

@Component({
  selector: 'app-question-type',
  templateUrl: './question-type.component.html',
  styleUrls: ['./question-type.component.css']
})
export class QuestionTypeComponent implements OnInit {

  private maxid: number;
  private currentid: number;
  dummyid  = 1; 
  constructor(private selectService: SelectService) { }

  ngOnInit() {

    this.selectService.getQtypeMaxid().subscribe(QtypeData => {
      
        this.maxid = QtypeData[0].maxId;
       
       
    });

  }

  onSubmit(form: NgForm, even:Event) {
    if (form.invalid) {
      return;
    }

   
    this.currentid = this.maxid + 1;
    const questionType = form.value.Qtype; 
    this.selectService.addQuestionType(this.currentid, questionType);
   }

 

}
