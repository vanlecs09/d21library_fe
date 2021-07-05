import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberDTO } from 'app/_shared/dtos/member.dto';
import { MemberRestApiService } from 'app/_shared/services/member-rest-api-service';

@Component({
  selector: 'app-member-update-form',
  templateUrl: './member-update-form.component.html',
  styleUrls: ['./member-update-form.component.css']
})
export class MemberUpdateFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MemberUpdateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MemberDTO,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }


  submit() {
    if (!this.data || !this.data.name) {
      this.openSnackBar("Vui lòng nhập tên member", "Đóng");
      return;
    }

    if (!this.data || !this.data.telePhoneNumber || !this.data.email) {
      this.openSnackBar("Vui lòng không để trống số điện thoại hoac Email", "Đóng");
      return;
    }
    this.dialogRef.close(this.data);
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  onMemberUpdate() {
    console.log(this.data);
  }

}
