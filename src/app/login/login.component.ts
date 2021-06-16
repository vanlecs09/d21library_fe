import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'app/_shared/services/auth.service';
import { ServiceLoginResponse } from 'app/_shared/services/service-login-response';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// declare var require: any;
// import * as Goodreads from 'goodreads-api-node/dist/';
// const Goodreads = require('goodreads-api-node');
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.testGoodRead();
  }


  async testGoodRead() {
    // const res = await Goodreads.searchBooks({ q: 'A song of ice and fire', page: 2, field: 'isbn' });
    // console.log(res);
  }

  async onLoginClicked() {
    if (!this.username) {
      this.openSnackBar("Vui lòng nhập tên đăng nhập", "Đóng");
      return;
    }

    if (!this.password) {
      this.openSnackBar("Vui lòng nhập mật khẩu", "Đóng");
      return;
    }

    // this.isLoading = true;
    const self = this;
    this.authService.login(this.username, this.password)
      .subscribe(
        (resp: ServiceLoginResponse) => {
        },
        (err) => {
          this.openSnackBar("Đăng nhập thất bại, mật khẩu hoặc username không đúng", "Đóng")
          console.error(err)
        },
        () => {
          self.router.navigate(['/']);
        });

    // this.isLoading = false;


  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.openSnackBar(error.message, "Đóng");
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
