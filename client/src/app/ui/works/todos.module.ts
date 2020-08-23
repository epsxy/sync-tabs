import { NgModule } from '@angular/core';
import { TodosListComponent } from './todos-list.component';
import { MatCardModule } from '@angular/material/card';
import { NewTodoComponent } from './start/new-todo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
    ],
    declarations: [NewTodoComponent, TodosListComponent],
    providers: [],
    bootstrap: [NewTodoComponent, TodosListComponent],
    exports: [NewTodoComponent],
})
export class TodosModule {}
