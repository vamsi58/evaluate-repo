import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallQuestionsComponent } from './viewall-questions.component';

describe('ViewallQuestionsComponent', () => {
  let component: ViewallQuestionsComponent;
  let fixture: ComponentFixture<ViewallQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewallQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
