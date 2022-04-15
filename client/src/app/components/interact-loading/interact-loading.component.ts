import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-interact-loading',
    templateUrl: './interact-loading.component.html',
    styleUrls: ['./interact-loading.component.scss']
})
export class InteractLoadingComponent implements OnInit {
    public dialogRef: MatDialogRef<InteractLoadingComponent>;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

    // currentProgress: Subject;
    progress: Number = 0;
    total: Number = 0;
    errors: Array<String> = [];
    loadingMessage: String = '';

    ngOnInit(): void {

        if (this.data && 'currentProgress' in this.data && 'total' in this.data) {
            const currentProgress: Subject<any> = this.data['currentProgress'];
            const currentError: Subject<any> = this.data['currentError'];
            currentProgress.subscribe((progress: Number) => {
                this.progress = progress;

                if (this.progress >= this.total) {
                    setTimeout(() => {
                        this.prepareToClose();
                    }, 100);
                }
            });
            currentError.subscribe((error: String) => {
                if (this.errors.indexOf(error) === -1) {
                    this.errors.push(error);
                }
            });

            this.total = this.data['total'];
            this.loadingMessage = this.data && 'loadingMessage' in this.data && this.data.loadingMessage ? this.data.loadingMessage : '';
        }
    }
    prepareToClose(): void {
        // If error, do not auto close
        if (this.errors.length === 0) {

            setTimeout(() => {
                this.dialog.closeAll();
            }, 1000);
        }
    }
    closeLoading(): void {
        this.dialog.closeAll();
    }

}
