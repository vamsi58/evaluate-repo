import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef
} from "@angular/material";

//import {MAT_DIALOG_DATA} from '@angular/material'; 
//import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { AppComponent } from "./app.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { HomeComponent } from "./home/home.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorComponent } from "./error/error.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { CreateQuestionComponent } from './questions/create-question/create-question.component';
import { QuestionsListComponent } from './questions/questions-list/questions-list.component';
import { QuestionViewComponent } from './questions/question-view/question-view.component';
import { QuestionCreateComponent } from './questions/question-create/question-create.component';
import { QuestionEditComponent } from './questions/question-edit/question-edit.component';
import { EditQuestionComponent } from './questions/edit-question/edit-question.component';
import { QuestionDeleteComponent } from './questions/question-delete/question-delete.component';


import { MultiSelectComponent  } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
// import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';



@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HomeComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    DashboardComponent,
    EditorComponent,
    CreateQuestionComponent,
    EditQuestionComponent,
    QuestionsListComponent,
    QuestionViewComponent,
    QuestionCreateComponent,
    QuestionEditComponent,
    QuestionDeleteComponent,
    MultiSelectComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
    // ButtonModule,
    // CheckBoxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, QuestionDeleteComponent, QuestionEditComponent,QuestionViewComponent]

})
export class AppModule {}
