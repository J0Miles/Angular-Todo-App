import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { TodosComponent } from './todos/todos.component'

const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'reset', component: TodosComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
