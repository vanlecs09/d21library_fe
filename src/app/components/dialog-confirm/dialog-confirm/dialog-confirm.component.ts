import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfirm } from 'app/_shared/models/dialog-confirm.model';

@Component({
    selector: 'app-dialog-confirm',
    templateUrl: './dialog-confirm.component.html',
    styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogConfirm,
        private snackBar: MatSnackBar,
    ) {
        console.log("open dialog");
    }


    ngOnInit(): void {
    }

    submit(): void {
        this.dialogRef.close(true);
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
