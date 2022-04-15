import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-interact-dialog',
    templateUrl: './interact-dialog.component.html',
    styleUrls: ['./interact-dialog.component.scss']
})
export class InteractDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<InteractDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { } 

    ngOnInit(): void {
    }

    close(): void {
        this.dialogRef.close();
    }

}
