import { Injectable, NgZone } from '@angular/core';
import { RootState } from '../store/root';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { InitTodo } from '../store/todos/todos.actions';

@Injectable()
// @ts-ignore
export class SyncStoreService {
    channel: BroadcastChannel = null;
    lastReceivedAction = null;
    actionsToIgnore = [];

    constructor(
        private store: Store<RootState>,
        private actions: Actions,
        private ngZone: NgZone
    ) {
        this.channel = new BroadcastChannel('todos-app');
        this.channel.onmessage = msg => this.onMessage(msg);
        this.channel.postMessage(JSON.stringify({ type: 'TAB_CONNECTED' }));
        this.actions.subscribe(action => {
            if (
                !this.actionsToIgnore.includes(action.type) &&
                action !== this.lastReceivedAction
            ) {
                this.channel.postMessage(JSON.stringify(action));
            }
        });
    }

    onMessage(msg: MessageEvent): void {
        this.ngZone.run(() => {
            const parsedData = JSON.parse(msg.data);
            if (parsedData.type === 'TAB_CONNECTED') {
                this.lastReceivedAction = parsedData;
            }
            if (parsedData.type === 'INIT_DATA') {
                this.lastReceivedAction = parsedData;
                this.store.dispatch(new InitTodo({ todos: msg.data.todos }));
            } else {
                this.lastReceivedAction = parsedData;
                console.log(parsedData);
                this.store.dispatch(parsedData);
            }
        });
    }
}
