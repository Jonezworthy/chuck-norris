import { Component, OnInit, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { JokesService } from 'src/app/services/jokes.service';
import { Joke } from 'src/interfaces/joke';
import { environment } from '../../../environments/environment';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InteractService } from 'src/app/services/interact.service';

@Component({
    selector: 'app-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit, OnDestroy {
    @Output() manualSearch = new EventEmitter<Boolean>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    loading: Boolean = true;
    environment = environment;

    displayedColumns: string[] = ['text', 'createdAt', 'actions'];
    jokes: Observable<Joke[]>;

    resultsLength = 0;
    isLoadingResults = true;
    pageSize: number = 10;

    constructor(private Interact: InteractService, private Jokes: JokesService, private snackBar: MatSnackBar) {
    }


    ngOnInit(): void {
        this.loading = false;
    }

    ngAfterViewInit(): void {
        this.paginator.pageIndex = 0;
        this.paginator.pageSize = 10;
        this.sort.active = 'createdAt';
        this.sort.direction = 'desc';

        this.jokes = merge(this.sort.sortChange, this.paginator.page, this.manualSearch)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;

                    return this.Jokes.getJokes(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);

                }),
                map(data => {
                    this.isLoadingResults = false;
                    this.resultsLength = data.count;
                    return data.data;
                }),
                catchError(() => {
                    this.isLoadingResults = true;
                    setTimeout(() => {
                        this.ngAfterViewInit();
                    }, 2000);
                    return [];
                })
            );
    }

    async delete(joke: Joke): Promise<void> {
        const secondsBeforeRealDelete = 3000;
        this.isLoadingResults = true;
        joke.hidden = true;
        await this.Jokes.putJoke(joke);
        this.manualSearch.emit();
        let snackBarRef = this.snackBar.open('Deleted this joke.', 'Undo', { duration: secondsBeforeRealDelete });

        const delayedDelete = setTimeout(async () => {
            if (await (await this.Jokes.deleteJoke(joke)).status !== 'ok') {
                this.Interact.displayDialog('Error!', 'An error occurred during the deletion of a joke.');
            }
        }, secondsBeforeRealDelete);

        snackBarRef.onAction().subscribe(async () => {
            clearTimeout(delayedDelete);
            joke.hidden = false;
            await this.Jokes.putJoke(joke);
            this.manualSearch.emit();
        });
    }

    ngOnDestroy(): void {

    }

}
