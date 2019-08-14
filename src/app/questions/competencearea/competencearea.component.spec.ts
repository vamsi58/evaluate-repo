import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceareaComponent } from './competencearea.component';

describe('CompetenceareaComponent', () => {
  let component: CompetenceareaComponent;
  let fixture: ComponentFixture<CompetenceareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetenceareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
