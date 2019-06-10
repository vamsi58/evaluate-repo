import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { HomeComponent } from "./home/home.component";
import { CreateQuestionComponent } from "./questions/create-question/create-question.component";
import { QuestionsListComponent } from "./questions/questions-list/questions-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";
import { QuestionViewComponent } from "./questions/question-view/question-view.component";
import {EditQuestionComponent}  from "./questions/edit-question/edit-question.component"
//import { QuestionEditComponent } from "./questions/question-edit/question-edit.component";

const routes: Routes = [
  
  { 
    path: "", 
    redirectTo: 'home',
    pathMatch: 'full'
  },

  { 
    path: '', 
    component: DashboardComponent, 
    canActivate: [AuthGuard],
    children: [
    { 
      path: 'home', 
      component: HomeComponent
    }, 
    { path: "questions", 
      component: QuestionsListComponent
    },
    { 
      path: "create-question", 
      component: CreateQuestionComponent 
    },
    
    { 
      path: "edit-question", 
      component: EditQuestionComponent 
    },
  ]
},
  { 
    path: "login", 
    component: LoginComponent 
  },
  { 
    path: "signup", 
    component: SignupComponent 
  },
  { 
    path: "test", 
    component: QuestionViewComponent 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
