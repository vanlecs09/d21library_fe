import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfirmComponent } from 'app/components/dialog-confirm/dialog-confirm/dialog-confirm.component';
import { MemberDTO } from 'app/_shared/dtos/member.dto';
import { DialogConfirm } from 'app/_shared/models/dialog-confirm.model';
import { MemberRestApiService } from 'app/_shared/services/member-rest-api-service';
import { ServiceResponseBase } from 'app/_shared/services/service-response-base';
import { ServiceResponseWithoutDataBase } from 'app/_shared/services/service-response-without-data-base';
import { MemberNewFormComponent } from '../member-new-form/member-new-form/member-new-form.component';
import { MemberUpdateFormComponent } from '../member-update-form/member-update-form.component';

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['./member-management.component.css']
})
export class MemberManagementComponent implements OnInit {
  memberDtos: MemberDTO[];
  constructor(
    private memberRestApiService: MemberRestApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.fetchMember();
  }

  ngOnInit(): void {
    this.fetchMember();
  }

  fetchMember(): void {
    const self = this;
    this.memberRestApiService.getAllMembers()
      .subscribe((resp: ServiceResponseBase<MemberDTO[]>) => {
        if (resp.resultCode == 1) {
          self.memberDtos = resp.data;
        } else {
          self.openSnackBar(resp.message, "Đóng");
        }
      },
        (error) => {
          self.openSnackBar(error, "Đóng");
        });
  }

  onTouchAddMember() {
    const dialogRef = this.dialog.open(MemberNewFormComponent, {
      disableClose: true,
      autoFocus: true,
      data: {
      }
    });
    const self = this;
    dialogRef.afterClosed()
      .subscribe(async memeberDto => {
        if (!memeberDto) return;
        self.memberRestApiService.Add(memeberDto)
          .subscribe((resp: ServiceResponseWithoutDataBase) => {
            if (resp.resultCode == 1) {
              self.fetchMember();
              self.openSnackBar(resp.message, "Đóng");
            } else {
              self.openSnackBar(resp.message, "Đóng");
            }
          });
      });
  }


  onDelete(memberDto: MemberDTO) {
    const self = this;

    var dialogConfirm = new DialogConfirm();
    dialogConfirm.title = "Xác nhận";
    dialogConfirm.content = "Bạn có chắc muốn đuổi (sân) member ra khỏi thư viện không";
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      disableClose: true,
      autoFocus: true,
      data: dialogConfirm
    });
    dialogRef.afterClosed()
      .subscribe(async result => {
        if (!result) return;
        self.memberRestApiService.Delete(memberDto)
          .subscribe((resp: ServiceResponseWithoutDataBase) => {
            if (resp.resultCode == 1) {
              self.fetchMember();
              self.openSnackBar(resp.message, "Đóng");
            } else {
              self.openSnackBar(resp.message, "Đóng");
            }
          });
      })



  }

  onDetail(memberDto: MemberDTO) {
    const self = this;
    const dialogRef = this.dialog.open(MemberUpdateFormComponent, {
      disableClose: true,
      autoFocus: true,
      data: { ...memberDto }
    });

    dialogRef.afterClosed()
      .subscribe(async result => {
        console.log(result);
        if (!result) return;
        self.memberRestApiService.Update(result)
          .subscribe((resp: ServiceResponseWithoutDataBase) => {
            if (resp.resultCode == 1) {
              this.openSnackBar(resp.message, "Đóng");
            } else {
              this.openSnackBar(resp.message, "Đóng");
            }
            self.fetchMember();
          });
      });

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}
