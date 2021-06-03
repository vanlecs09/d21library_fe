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
    // LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    FormsModule,
    MatSnackBarModule,
    MatInputModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
