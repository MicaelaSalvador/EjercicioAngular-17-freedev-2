import { TODO_DATA } from './../assets/todo';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from "./pages/todo/todo.component";
import { NTodo } from './models/todo.model';
import { CommonModule } from '@angular/common';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TodoComponent,
    CommonModule,
    HighlightedDirective,
    NgxUnlessDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

  todoData = TODO_DATA[0];

  constructor(){ }


  
  @ViewChild('todoRef',{read:HighlightedDirective}) highlightedDirective!:HighlightedDirective;
  
  ngAfterViewInit(): void {
    // console.log(this.highlightedDirective);
  }
  getTodoInfo(val:NTodo.TodoData){
    console.log(val);
  }

  trackByFn(_index:number , item:NTodo.TodoData) {
    return item.id;
  }

  onToggleHighlighted(highlighted : boolean){
    console.log(highlighted);
  }

  // orderData(){
  //   this.todoData.sort((a,b) => a.priority - b.priority);
  // }
}
