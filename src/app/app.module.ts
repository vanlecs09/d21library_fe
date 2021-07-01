import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookManagementComponent } from './book-management/book-management.component';
import { BookListComponent } from './book-management/book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewBookFormComponent } from './book-management/new-book-form/new-book-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { BookFilterComponent } from './book-management/book-filter/book-filter.component';
import { BookDetailComponent } from './book-management/book-detail/book-detail.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_shared/services/auth.service';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChipInputComponent } from './components/chip-input/chip-input.component';
import { MatChipsModule } from '@angular/material/chips';
import { MemberManagementComponent } from './member-management/member-management/member-management.component';
import { MemberListComponent } from './member-management/member-list/member-list/member-list.component';
import { MemberFilterFormComponent } from './member-management/member-filter-form/member-filter-form.component';
import { MemberNewFormComponent } from './member-management/member-new-form/member-new-form/member-new-form.component';
import { MemberUpdateFormComponent } from './member-management/member-update-form/member-update-form.component';
// import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    BookManagementComponent,
    BookListComponent,
    NewBookFormComponent,
    BookFilterComponent,
    BookDetailComponent,
    LoginComponent,
    MyLoaderComponent,
    ChipInputComponent,
    MemberManagementComponent,
    MemberListComponent,
    MemberFilterFormComponent,
    MemberNewFormComponent,
    MemberUpdateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    FormsModule,
    MatSnackBarModule,
    MatInputModule,
    ComponentsModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatChipsModule
  ],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
