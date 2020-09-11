import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodosModule } from './ui/works/todos.module';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from './store/todos/todos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { SyncStoreModule } from './services/sync.module';
import { SyncStoreService } from './services/sync.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        StoreModule.forRoot({ todos: todosReducer }),
        EffectsModule.forRoot(),
        SyncStoreModule.forRoot('todos-app', []),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DeviceDetectorModule,
        TodosModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private sync: SyncStoreService) {}
}
