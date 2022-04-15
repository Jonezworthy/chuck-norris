import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-interact-confirm',
    templateUrl: './interact-confirm.component.html',
    styleUrls: ['./interact-confirm.component.scss']
})
export class InteractConfirmComponent implements OnInit {
    public dialogRef: MatDialogRef<InteractConfirmComponent>;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
    successCallback: Function = () => { };

    ngOnInit(): void {
        if (this.data && 'successCallback' in this.data && this.data['successCallback'] && typeof this.data['successCallback']) {
            this.successCallback = this.data['successCallback'];
        }
    }

}
