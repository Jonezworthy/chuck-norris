import { Component, OnInit, OnDestroy } from '@angular/core';
import { InteractService } from 'src/app/services/interact.service';
import { HealthService } from 'src/app/services/health.service';
import { ApiResponse } from 'src/interfaces/apiResponse';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JokesService } from 'src/app/services/jokes.service';
import { Joke } from 'src/interfaces/joke';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    searchFormGroup: FormGroup = new FormGroup({});
    loading: Boolean = true;
    downloading: Boolean = false;
    environment = environment;

    constructor(private Interact: InteractService, private Jokes: JokesService, private Status: HealthService, private formBuilder: FormBuilder) {

    }

    async ngOnInit(): Promise<void> {
        this.searchFormGroup.addControl('jokeText', this.formBuilder.control('', [Validators.required, Validators.minLength(10)]));



        this.checkHealth();
        this.loading = false;
    }

    async checkHealth(): Promise<void> {
        try {
            this.Interact.closeDialog();
            const connectedToDatabase: Boolean = await this.Status.getHealthCheck();
            if (connectedToDatabase === false) {
                this.Interact.displayPrompt('Database is not connected', 'The database connection is not set up. \n\n\Please enter the password that was sent to you and press OK to set up the connection.', 'Database password', async (password) => {

                    this.Interact.displayLoading(0, 1, () => { }, 'Setting the database connection...');


                    const updateResponse = await this.Status.updateDatabasePassword(password);

                    if (updateResponse) {
                        this.Interact.addProgress(1);
                        setTimeout(() => {
                            this.Interact.displayDialog('Connected!', 'All connected now 👍');
                        }, 2000);
                    } else {
                        this.Interact.setError('That password wasn\'t correct');

                        setTimeout(() => {
                            this.checkHealth();
                        }, 2000);
                    }

                });
            }
        } catch (err) {
            this.Interact.displayDialog('Error!', 'Something catastrophic went wrong!');
            console.log(err);
        }
    }

    async downloadJoke(): Promise<void> {
        this.downloading = true;
        try {
            const newJoke: Joke = await this.Jokes.getNewJoke();

            if (newJoke) {
                this.searchFormGroup.controls.jokeText.setValue(newJoke.text);
            } else {
                this.Interact.displayDialog();
            }
        } catch (err) {
            this.Interact.displayDialog();
            console.log(err);
        }
        this.downloading = false;
    }

    async saveJoke(): Promise<void> {
        const joke: Joke = { text: this.searchFormGroup.controls.jokeText.value };
        this.Interact.displayLoading(0, 1, () => { }, 'Saving your joke...');
        const response = await this.Jokes.postJoke(joke, false);

        if (response && response.status && response.status === 304) {
            setTimeout(() => {
                this.Interact.closeDialog();
                this.Interact.displayConfirm('Already exists!', 'This joke already exists, overwrite it?', async () => {
                    this.Interact.displayLoading(0, 1, () => { }, 'Overwriting your joke...');
                    if ((await this.Jokes.postJoke(joke, true)).status === 'ok') {
                        this.Interact.addProgress(1);
                    } else {
                        this.Interact.addProgress(1);
                        this.Interact.displayDialog();
                    }
                });
            }, 1500);
        } else {
            this.Interact.addProgress(1);
        }
    }

    ngOnDestroy(): void {

    }


    // 👍
}
