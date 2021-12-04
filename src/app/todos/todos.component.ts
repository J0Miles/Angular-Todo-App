import { Component, OnInit } from '@angular/core';
import { DataService } from '../models/data.service';
import { Todo } from '../models/todo.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos!: Todo[]
  showValidationErrors!: boolean

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos()
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return this.showValidationErrors = true
    }

    this.dataService.addTodo(new Todo(form.value.text))

    this.showValidationErrors = false
    return form.reset()
  }

}
