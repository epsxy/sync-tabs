import { Todo } from '../../model/todo.model';
import { ActionImpl } from '../actionImpl';

export enum TodosActionTypes {
    Add = '[Todos] Add',
    Remove = '[Todos] Remove',
    Toggle = '[Todos] Toggle',
    Init = '[Todos] Init',
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

export class InitTodo implements ActionImpl {
    readonly type = TodosActionTypes.Init;
    constructor(public payload: { todos: Todo[] }) {}
}

export type TodosActions = AddTodo | RemoveTodo | ToggleTodo | InitTodo;
