import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../../model/todo.model';
import { Store } from '@ngrx/store';
import { RootState } from '../../store/root';
import { Subscription } from 'rxjs';
import { RemoveTodo, ToggleTodo } from '../../store/todos/todos.actions';

@Component({
    selector: 'app-todos-list',
    templateUrl: 'todos-list.component.html',
    styleUrls: ['todos-list.component.sass'],
})
export class TodosListComponent implements OnInit, OnDestroy {
    todos: Todo[] = [];
    isCreatingNewTodo = false;
    subscriptions: Subscription[] = [];

    constructor(private store: Store<RootState>) {}

    ngOnInit(): void {
        const todosSub = this.store
            .select(state => state.todos)
            .subscribe(todos => {
                const tds = [...todos];
                tds.sort((t1, t2) => {
                    if (t1.checked && !t2.checked) {
                        return 1;
                    } else if (!t1.checked && t2.checked) {
                        return -1;
                    } else {
                        return t1.id.localeCompare(t2.id);
                    }
                });
                this.todos = tds;
            });

        this.subscriptions.push(todosSub);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    createTodo(): void {
        this.isCreatingNewTodo = true;
    }

    onCreateTodoClose(): void {
        this.isCreatingNewTodo = false;
    }

    checkTodo(id: string): void {
        this.store.dispatch(new ToggleTodo({ id, checked: true }));
    }

    uncheckTodo(id: string): void {
        this.store.dispatch(new ToggleTodo({ id, checked: false }));
    }

    removeTodo(id: string): void {
        this.store.dispatch(new RemoveTodo(id));
    }
}
