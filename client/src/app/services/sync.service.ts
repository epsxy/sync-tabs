import { Inject, Injectable, NgZone } from '@angular/core';
import { RootState } from '../store/root';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { InitTodo, TodosActionTypes } from '../store/todos/todos.actions';
import { Todo } from '../model/todo.model';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()
export class SyncStoreService {
    channel: BroadcastChannel = null;
    lastReceivedAction = null;
    name = 'default-channel-name';
    blacklist = [];
    todos: Todo[] = [];

    constructor(
        @Inject('channelName') private channelName: string,
        @Inject('blacklist') private ignoreList: string[],
        private store: Store<RootState>,
        private actions: Actions,
        private deviceDetector: DeviceDetectorService,
        private ngZone: NgZone
    ) {
        this.name = channelName;
        this.blacklist = ignoreList;
        if (
            this.deviceDetector.isDesktop() &&
            this.deviceDetector.browser !== 'Safari' &&
            this.deviceDetector.browser !== 'Mobile Safari' &&
            this.deviceDetector.browser !== 'Internet Explorer' &&
            this.deviceDetector.browser !== 'IE Mobile'
        ) {
            this.channel = new BroadcastChannel(this.name);
            this.channel.onmessage = msg => this.onMessage(msg);
            this.channel.postMessage(JSON.stringify({ type: 'TAB_CONNECTED' }));
            this.store.subscribe(state => {
                this.todos = state.todos;
            });
            this.actions.subscribe(action => {
                if (
                    !this.blacklist.includes(action.type) &&
                    action !== this.lastReceivedAction
                ) {
                    this.channel.postMessage(JSON.stringify(action));
                }
            });
        }
    }

    onMessage(msg: MessageEvent): void {
        this.ngZone.run(() => {
            const parsedData = JSON.parse(msg.data);
            if (parsedData.type === 'TAB_CONNECTED') {
                this.channel.postMessage(
                    JSON.stringify(new InitTodo({ todos: this.todos }))
                );
            }
            if (parsedData.type === TodosActionTypes.Init) {
                this.lastReceivedAction = parsedData;
                this.store.dispatch(parsedData);
            } else {
                this.lastReceivedAction = parsedData;
                this.store.dispatch(parsedData);
            }
        });
    }
}
