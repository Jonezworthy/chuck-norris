// modules declared in here are for the components declared in here

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
// //
// // Angular Materials
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
//

import { InteractConfirmComponent } from './components/interact-confirm/interact-confirm.component';
import { InteractDialogComponent } from './components/interact-dialog/interact-dialog.component';
import { InteractLoadingComponent } from './components/interact-loading/interact-loading.component';
import { InteractPromptComponent } from './components/interact-prompt/interact-prompt.component';
//

// Pipes
import { DateAgoPipe } from './pipes/date-ago.pipe';
//
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        DragDropModule,
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSliderModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatStepperModule,
        MatRadioModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatTooltipModule,
        MatGridListModule,
        MatListModule,
        MatBadgeModule,
        MatChipsModule,
        MatCheckboxModule,
        MatDialogModule,
    ],
    declarations: [
        DateAgoPipe,
        InteractConfirmComponent,
        InteractDialogComponent,
        InteractLoadingComponent,
        InteractPromptComponent,
    ],
    exports: [
        DateAgoPipe,
        InteractConfirmComponent,
        InteractDialogComponent,
        InteractLoadingComponent,
        InteractPromptComponent,
    ],
    providers: [],
    entryComponents: []
})
export class SharedModule { }