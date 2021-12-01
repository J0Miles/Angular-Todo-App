import { Component, OnInit } from '@angular/core';
import { DataService } from '../models/data.service';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos!: Todo[]

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos()
  }

  onFormSubmit() {
    console.log("Form Submitted")
  }

}
