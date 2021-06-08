import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookManagementComponent } from './book-management/book-management.component';
import { AuthenGuard } from './guards/authen.guard';
import { LoginComponent } from './login/login.component';

// const routes: Routes = [];
const routes: Routes = [
  {
    path: "",
    component: BookManagementComponent,
    canActivate: [AuthenGuard]
  },
  {
    path: "login",
    component: LoginComponent,
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
