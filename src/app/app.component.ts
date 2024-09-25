import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './pages/header/header.component';
import { NTodo } from './models/todo.model';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TodoComponent,
    CommonModule,
    HeaderComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  // todos = TODO_DATA;
   todos: NTodo.TodosResponse = {totalRecords: 0, data: []};
  // todos!: Observable<NTodo.TodosResponse>;
     
  constructor(private readonly apiService: ApiService) {}


  ngOnInit(): void {
   this.getTodos();
  }

private getTodos(){
   //  this.todos = this.http.get<NTodo.TodosResponse>(this.baseUrl);
   this.apiService.get<NTodo.TodosResponse>().subscribe(val => this.todos = val);
}

  deleteTodo(item: NTodo.TodoData) {
    this.apiService.delete<NTodo.TodosResponse>( item.id).subscribe(todos => this.todos = todos );
  }

  updateTodo(item : NTodo.TodoData) {
    // this.apiService.put(item, item.id).subscribe(console.log);
     this.apiService.patch({ description: item.description}, item.id).subscribe(console.log);
  }
  
addTodo(){
  this.apiService.post({
      "title": "Resolver un bug",
      "description": "Identificar y corregir un problema de software reportado por el equipo de pruebas.",
      "status": "En progreso",
      "priority": 2,
      "hidden": false,
      "id": "84ec809d-a643-4a9f-a2b9-6225d3290d4d",
      "deadLine": "2024-04-08T03:25:54.898Z",
      "color": {
          "status": "#76761c",
          "priority": "#3e3e8f"
      },
      "class": {
          "status": "in-progress",
          "priority": "medium"
      },
      "progress": 0.5
  }).subscribe(() => this.getTodos());
}

}
