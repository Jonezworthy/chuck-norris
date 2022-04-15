import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { InteractDialogComponent } from '../components/interact-dialog/interact-dialog.component';
import { InteractConfirmComponent } from '../components/interact-confirm/interact-confirm.component';
import { InteractLoadingComponent } from '../components/interact-loading/interact-loading.component';
import { InteractPromptComponent } from '../components/interact-prompt/interact-prompt.component';

@Injectable({
    providedIn: 'root'
})
export class InteractService {

    public currentProgress: Subject<Object> = new Subject();
    public currentError: Subject<Object> = new Subject();
    private loadingProgress: number;
    private loadingTotal: number;
    private loadingCallback: Function;

    constructor(public dialog: MatDialog) { }
    dialogRef: any;

    displayDialog(title: String = 'Sorry!', content: String = 'Sorry, an error occurred! Please try again later'): InteractService {
        this.dialogRef = this.dialog.open(InteractDialogComponent, {
            data: { title, content }
        });
        return this;
    }
    displayConfirm(title: String = 'Are you sure?', content: String = 'Are you sure?', successCallback: Function): InteractService {
        this.dialogRef = this.dialog.open(InteractConfirmComponent, {
            data: { title, content, successCallback }
        });
        return this;
    }
    displayLoading(progress: number, total: number, finishedCallback: Function = () => { }, loadingMessage: String = ''): InteractService {
        this.loadingProgress = progress;
        this.loadingTotal = total;
        this.loadingCallback = finishedCallback;
        this.dialogRef = this.dialog.open(InteractLoadingComponent, {
            disableClose: true,
            data: { currentProgress: this.currentProgress, currentError: this.currentError, total, loadingMessage }
        });
        return this;
    }

    displayPrompt(title: String = 'Please enter...', content: String = '', questionContent: String, successCallback: Function): InteractService {

        this.dialogRef = this.dialog.open(InteractPromptComponent, {
            width: '450px',
            data: { title, questionContent, content, successCallback }
        });

        return this;
    }

    closeDialog(): InteractService {
        this.dialog.closeAll();
        return this;
    }

    addProgress(progress: number): InteractService {
        this.loadingProgress += progress;
        this.setProgress(this.loadingProgress);

        return this;
    }
    setProgress(progress: number): InteractService {
        this.loadingProgress = progress;
        this.currentProgress.next(progress);
        if (this.loadingProgress === this.loadingTotal && typeof this.loadingCallback === 'function') {
            this.loadingCallback();
        }
        return this;
    }
    setError(error: String): InteractService {
        this.currentError.next(error);
        this.dialogRef.disableClose = false;

        return this;
    }
}
