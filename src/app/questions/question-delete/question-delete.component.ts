import { Component, OnInit, Inject  } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';  

@Component({
  selector: 'app-question-delete',
  templateUrl: './question-delete.component.html',
  styleUrls: ['./question-delete.component.css']
})
export class QuestionDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
