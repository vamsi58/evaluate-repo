import { Component, OnInit, Inject } from '@angular/core';
import { QuestionService } from "../question.service";
import { SelectService } from '../select.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';  
import { QuestionEditComponent } from '../question-edit/question-edit.component';
import { MatDialog } from '@angular/material/dialog';
import {Answer} from '../answer.model';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {

  answers: Answer[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private selectService: SelectService, 
    private questionService: QuestionService,
    private dialog: MatDialog
  ) { 

    this.answers = data.question.quesAnswers;
  
  }

  ngOnInit() {
  }

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

}
