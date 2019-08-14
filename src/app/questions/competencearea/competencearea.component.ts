import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { SelectService } from '../select.service';

@Component({
  selector: 'app-competencearea',
  templateUrl: './competencearea.component.html',
  styleUrls: ['./competencearea.component.scss']
})
export class CompetenceareaComponent implements OnInit {

  private maxid: number;
  private currentid: number;
  dummyid  = 1; 

  constructor(private selectService: SelectService) { }

  ngOnInit() {

    this.selectService.getCareaMaxid().subscribe(CareaData => {
      
        this.maxid = CareaData[0].maxId;
       
       
    });

  }

  onSubmit(form: NgForm, even:Event) {
    if (form.invalid) {
      return;
    }

   
    this.currentid = this.maxid + 1;

    console.log(this.currentid);
    
    if(!this.currentid){
      this.currentid = 1;
      console.log(this.currentid);
    }
    const competencearea = form.value.Carea; 

    console.log(competencearea, form.value.Carea);
    this.selectService.addCompetenceArea(this.currentid, competencearea);
   }

  
}
