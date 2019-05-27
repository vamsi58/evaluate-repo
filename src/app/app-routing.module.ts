import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { HomeComponent } from "./home/home.component";
import { CreateQuestionComponent } from "./questions/create-question/create-question.component";
import { ViewallQuestionsComponent } from "./questions/viewall-questions/viewall-questions.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  
  { path: "", redirectTo: 'dashboard', pathMatch: 'full' },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard],
     children: [
    { path: '', component: HomeComponent}]
},

  { path: "create", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "create-question", component: CreateQuestionComponent },
  { path: "viewall-questions", component: ViewallQuestionsComponent },
  { path: "edit/:postId", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
