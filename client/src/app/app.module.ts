import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodosModule } from './ui/works/todos.module';
import { Store, StoreModule } from '@ngrx/store';
import { todosReducer } from './store/todos/todos.reducer';
import { SyncStoreService } from './services/sync-store.service';
import { EffectsModule } from '@ngrx/effects';
import { RootState } from './store/root';

@NgModule({
    declarations: [AppComponent],
    imports: [
        StoreModule.forRoot({ todos: todosReducer }),
        EffectsModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TodosModule,
    ],
    providers: [SyncStoreService],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private sync: SyncStoreService) {}
}
