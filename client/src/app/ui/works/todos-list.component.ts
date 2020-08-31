import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Todo } from '../../model/todo.model';
import { Store } from '@ngrx/store';
import { RootState } from '../../store/root';
import { Subscription } from 'rxjs';
import { RemoveTodo, ToggleTodo } from '../../store/todos/todos.actions';
import { NewTodoComponent } from './start/new-todo.component';

@Component({
    selector: 'app-todos-list',
    templateUrl: 'todos-list.component.html',
    styleUrls: ['todos-list.component.sass'],
})
export class TodosListComponent implements OnInit, OnDestroy {
    todos: Todo[] = [];
    isCreatingNewTodo = false;
    subscriptions: Subscription[] = [];
    @ViewChild('newTodoComponent') newTodoComponent: NewTodoComponent;

    constructor(private store: Store<RootState>) {}

    ngOnInit(): void {
        const todosSub = this.store
            .select(state => state.todos)
            .subscribe(todos => this.updateTodos(todos));

        this.subscriptions.push(todosSub);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    private updateTodos(todos: Todo[]): void {
        this.todos = [];
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
    }

    createTodo(): void {
        this.isCreatingNewTodo = true;
        setTimeout(() => {
            this.newTodoComponent.setFocus();
        }, 100);
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
