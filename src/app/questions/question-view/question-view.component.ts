import { Component, OnInit, Inject } from '@angular/core';
import { QuestionService } from "../question.service";
import { SelectService } from '../select.service';
import {MAT_DIALOG_DATA} from '@angular/material';  
import { QuestionEditComponent } from '../question-edit/question-edit.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private selectService: SelectService, 
    private questionService: QuestionService,
    private dialog: MatDialog
  ) { }

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