import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookManagementComponent } from './book-management/book-management.component';
import { BorrowManagementComponent } from './borrow-management/borrow-management.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthenGuard } from './guards/authen.guard';
import { LoginComponent } from './login/login.component';
import { MemberManagementComponent } from './member-management/member-management/member-management.component';

// const routes: Routes = [];
const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "books",
    component: BookManagementComponent,
    canActivate: [AuthenGuard]
  },
  {
    path: "members",
    component: MemberManagementComponent,
    canActivate: [AuthenGuard, AdminGuard],
  },
  {
    path: "borrows",
    component: BorrowManagementComponent,
    canActivate: [AuthenGuard, AdminGuard],
  },
  { path: '**', component: PagenotfoundComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
