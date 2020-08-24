import { Todo } from '../../model/todo.model';
import { ActionImpl } from '../actionImpl';

export enum TodosActionTypes {
    Add = '[Todos] Add',
    Remove = '[Todos] Remove',
    Toggle = '[Todos] Toggle',
}

export class AddTodo implements ActionImpl {
    readonly type = TodosActionTypes.Add;
    constructor(public payload: Todo) {}
}

export class RemoveTodo implements ActionImpl {
    readonly type = TodosActionTypes.Remove;
    constructor(public payload: string) {}
}

export class ToggleTodo implements ActionImpl {
    readonly type = TodosActionTypes.Toggle;
    constructor(public payload: { id: string; checked: boolean }) {}
}

export type TodosActions = AddTodo | RemoveTodo | ToggleTodo;
