import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RootState } from '../../../store/root';
import { Store } from '@ngrx/store';
import * as uuid from 'uuid';
import { AddTodo } from '../../../store/todos/todos.actions';

@Component({
    selector: 'app-new-todo',
    templateUrl: 'new-todo.component.html',
    styleUrls: ['new-todo.component.sass'],
})
export class NewTodoComponent {
    value = '';

    @Input('enable') enable = false;
    @Output() closeEvent = new EventEmitter();

    constructor(private store: Store<RootState>) {}

    onCancel(): void {
        this.closeEvent.emit();
    }

    onSubmit(): void {
        this.store.dispatch(
            new AddTodo({ id: uuid.v4(), content: this.value, checked: false })
        );
        this.value = '';
        this.closeEvent.emit();
    }
}
