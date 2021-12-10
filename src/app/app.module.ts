import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TodosComponent } from './todos/todos.component'
import { TodoItemComponent } from './todo-item/todo-item.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EditTodoDialogComponent } from './edit-todo-dialog/edit-todo-dialog.component'
import { MatDialogModule } from '@angular/material/dialog'
import { IdleModalComponent } from './idle-modal/idle-modal.component'
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    EditTodoDialogComponent,
    IdleModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
