import { ChangeDetectionStrategy, Component, OnInit, Optional, Self, SkipSelf } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
import { NTodo } from './models/todo.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule } from '@angular/forms';
import { HighlightedDirective } from './directives/highlighted.directive';
 import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TodoComponent,
    CommonModule,
    HeaderComponent,
    FormsModule,
    HighlightedDirective
  ],
  providers:[
    // ApiService,
    // {
    //   useValue:'http://localhost:3000',
    //   provide: 'BASE_URL'
    // }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection:ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {

  todos: NTodo.TodosResponse = {totalRecords: 0, data: []};

  constructor(
  // @Self()  private readonly apiService: ApiService
   //@SkipSelf()  private readonly apiService: ApiService
  //  @Optional()  private readonly apiService: ApiService
   private readonly apiService: ApiService
  ) {
    // console.log('AppComponent',apiService.instanceId);
  }

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.apiService.get<NTodo.TodosResponse>().subscribe(val => this.todos = val);
  }

  deleteTodo(item: NTodo.TodoData) {
    this.apiService.delete<NTodo.TodosResponse>(item.id).subscribe(todos => this.todos = todos);
  }

  updateTodo(item : NTodo.TodoData) {
    // esto estaba  comentado
    // this.apiService.put(item, item.id).subscribe(console.log);

    // esto no  estaba  comentado
    this.apiService.patch({ description: item.description}, item.id).subscribe(console.log);
  }

  addTodo() {
    this.apiService.post({
      "title": "Leer documentación técnica",
      "description": "Investigar y leer la documentación de una nueva tecnología o herramienta relevante para el proyecto.",
      "status": "Por hacer",
      "priority": 3,
      "hidden": false,
      "id": 1,
      "deadLine": "2024-04-07T03:25:54.898Z",
      "color": {
        "status": "#ed4040",
        "priority": "#68db68"
      },
      "class": {
        "status": "to-do",
        "priority": "low"
      },
      "progress": 0.2
    }).subscribe(() => this.getTodos());
  }
}
