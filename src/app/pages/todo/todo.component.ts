import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output, SkipSelf } from '@angular/core';
import { NTodo } from '../../models/todo.model';
import { CommonModule , registerLocaleData} from '@angular/common';
import es from'@angular/common/locales/es';
//  import { ApiService } from '../../services/api.service';
// import { API_TOKEN, apiServiceConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
registerLocaleData(es);

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  providers:[
  {
    provide:LOCALE_ID, useValue:'es'
  },
  // ApiService,
  // {
  //   useValue:'http://localhost:8000',
  //   provide: 'BASE_URL'
  // }
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {

  constructor(
  //  private readonly apiService: ApiService
  ){
    // console.log('TodoComponent',apiService.instanceId);
   }

  @Input({ required: true}) todoData!: NTodo.TodoData;

  @Output() onClickIcon = new EventEmitter<NTodo.TodoData>();


  get priority(): string {
    switch (this.todoData.priority) {
      case NTodo.Priority.LOW:
        
        return NTodo.PriorityText.LOW;
    
      case NTodo.Priority.MEDIUM:
        
        return NTodo.PriorityText.MEDIUM;
    
      default:
        return NTodo.PriorityText.HIGH;
    }
    
  }

  get progress() {
    return this.todoData.progress * 100;
  }

  get range() {
    if (this.progress >= 0 && this.progress <= NTodo.Range.LOW) {
      return NTodo.RangeText.LOW;
    } else if (this.progress > NTodo.Range.LOW && this.progress <= NTodo.Range.MEDIUM) {
      return NTodo.RangeText.MEDIUM;
    }

    return NTodo.RangeText.HIGH;
  }
}
