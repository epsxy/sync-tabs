import { Component } from '@angular/core';
import { Todo } from '../../model/todo.model';

@Component({
    selector: 'app-todos-list',
    templateUrl: 'todos-list.component.html',
    styleUrls: ['todos-list.component.sass'],
})
export class TodosListComponent {
    todos: Todo[] = [
        {
            id: '1',
            content: 'Buying some vegetables after work',
            checked: false,
        },
        {
            id: '1',
            content: 'Solving Navier-Stokes equations',
            checked: true,
        },
        {
            id: '1',
            content: 'Relaxing on a hot tub',
            checked: true,
        },
    ];
    isCreatingNewTodo = false;

    constructor() {}

    createTodo(): void {
        this.isCreatingNewTodo = true;
    }

    onCreateTodoCancel(): void {
        this.isCreatingNewTodo = false;
    }
}
