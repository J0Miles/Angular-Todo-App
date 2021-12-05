import { Component, OnInit } from '@angular/core'
import { DataService } from '../models/data.service'
import { Todo } from '../models/todo.model'
import { NgForm } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos!: Todo[]
  showValidationErrors!: boolean

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos()
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return (this.showValidationErrors = true)
    }

    this.dataService.addTodo(new Todo(form.value.text))

    this.showValidationErrors = false
    return form.reset()
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed
  }

  editTodo(todo: Todo) {
    // TODO: Implement update Todo, we need index of todo and user needs to be able to input new todo text
    const index = this.todos.indexOf(todo)
    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateTodo(index, result)
      }
    })
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)
    this.dataService.deleteTodo(index)
  }
}
