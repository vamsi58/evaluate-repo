import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';  
import { QuestionService } from "../question.service";
import { SelectService } from '../select.service';

@Component({
  selector: 'app-question-delete',
  templateUrl: './question-delete.component.html',
  styleUrls: ['./question-delete.component.css']
})
export class QuestionDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private selectService: SelectService, 
    private questionService: QuestionService
  ) { }

  ngOnInit() {
  }

  onSubmit(quesid: string) {
    //console.log(quesid);
    //this.isLoading = true;
    this.questionService.deleteQuestion(quesid).subscribe(() => {
      
    });
  }
}


