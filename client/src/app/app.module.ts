import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodosModule } from './ui/works/todos.module';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from './store/todos/todos.reducer';

@NgModule({
    declarations: [AppComponent],
    imports: [
        StoreModule.forRoot({ todos: todosReducer }),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TodosModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
