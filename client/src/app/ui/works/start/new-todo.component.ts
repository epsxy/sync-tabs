import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-new-todo',
    templateUrl: 'new-todo.component.html',
    styleUrls: ['new-todo.component.sass'],
})
export class NewTodoComponent {
    value = '';
    types = [{ name: 'Dummy', value: 'dummy' }];

    @Input('enable') enable = false;
    @Output() cancelEvent = new EventEmitter();

    constructor() {}

    onCancel(): void {
        this.cancelEvent.emit();
    }
}
