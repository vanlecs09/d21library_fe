import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookManagementComponent } from './book-management/book-management.component';
import { BorrowManagementComponent } from './borrow-management/borrow-management.component';
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
        path: "books",
        component: BookManagementComponent,
        canActivate: [AuthenGuard]
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "members",
        component: MemberManagementComponent,
        canActivate: [AuthenGuard],
    },
    {
      path: "borrows",
      component: BorrowManagementComponent,
      canActivate: [AuthenGuard],
    }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
