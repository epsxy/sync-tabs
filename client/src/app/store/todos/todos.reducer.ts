import { TodosActions, TodosActionTypes } from './todos.actions';
import { Todo } from '../../model/todo.model';

export type TodosState = Todo[];

export const initialState: Todo[] = [
    {
        id: '1',
        content: 'Buying some vegetables after work',
        checked: false,
    },
    {
        id: '2',
        content: 'Solving Navier-Stokes equations',
        checked: true,
    },
    {
        id: '3',
        content: 'Relaxing on a hot tub',
        checked: true,
    },
];

export function todosReducer(
    state: Todo[] = initialState,
    action: TodosActions
): Todo[] {
    switch (action.type) {
        case TodosActionTypes.Init:
            return action.payload.todos;
        case TodosActionTypes.Add:
            return [...state, action.payload];
        case TodosActionTypes.Remove:
            const newState = state.filter(todo => todo.id !== action.payload);
            return newState;
        case TodosActionTypes.Toggle:
            const todosMatches = state.filter(
                todo => todo.id === action.payload.id
            );
            if (todosMatches.length !== 1) {
                return state;
            }
            const newTodos = state.filter(
                todo => todo.id !== action.payload.id
            );
            newTodos.push({
                id: todosMatches[0].id,
                content: todosMatches[0].content,
                checked: action.payload.checked,
            });
            return newTodos;
        default:
            return state;
    }
}
