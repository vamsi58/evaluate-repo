import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { SelectService } from '../select.service';
import { CompetenceArea } from '../competence-area.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  private maxid: number;
  private currentid: number;
  dummyid = 1;
  competenceAreas: CompetenceArea[];
  selectedCompetence: CompetenceArea;

  private competenceareasSub: Subscription;

  constructor(private selectService: SelectService) { }

  ngOnInit() {

    this.selectedCompetence = new CompetenceArea(1, "Technical");

    this.selectService.getCompetenceArea();
    this.competenceareasSub = this.selectService
      .getCompetenceAreaUpdateListener()
      .subscribe((competenceAreaData: { competenceAreas: CompetenceArea[]; }) => {
        this.competenceAreas = competenceAreaData.competenceAreas;

        console.log(this.competenceAreas);

      });

    this.selectService.getCourseMaxid().subscribe(CourseData => {
    this.maxid = CourseData[0].maxId;


    });

  }

  onSubmit(form: NgForm, even: Event) {
    if (form.invalid) {
      return;
    }

    const competence = this.competenceAreas.filter((item) => item.id == form.value.competenceArea)[0].name;
    this.currentid = this.maxid + 1;

    console.log(this.currentid);

    if (!this.currentid) {
      this.currentid = 1;
      console.log(this.currentid);
    }
    const course = form.value.Course;

    console.log(course, form.value.Course);
    this.selectService.addCourse(this.selectedCompetence.id, this.currentid, course);
  }

}
