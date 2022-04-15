import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-interact-prompt',
    templateUrl: './interact-prompt.component.html',
    styleUrls: ['./interact-prompt.component.scss']
})
export class InteractPromptComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<InteractPromptComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    input: string;

    ngOnInit() {
    }

    close(returnVal: boolean = false): void {
        if (returnVal === true) {
            if (this.data && 'successCallback' in this.data && this.data['successCallback'] && typeof this.data['successCallback'] === 'function') {
                this.data['successCallback'](this.input);
            }
        }

        this.dialogRef.close();
    }

    keypress(event: any): void {
        if (event.key === 'Enter') {
            this.close(true);
        }
    }

}
