import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'app/_shared/services/auth.service';
import { ServiceLoginResponse } from 'app/_shared/services/service-login-response';

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
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
