import { RangePipe } from './../../pipes/range.pipe';
import { Attribute, Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, Output, SimpleChanges, SkipSelf } from '@angular/core';
import { NTodo } from '../../models/todo.model';
import { CommonModule , registerLocaleData} from '@angular/common';
import es from'@angular/common/locales/es';
//  import { ApiService } from '../../services/api.service';
// import { API_TOKEN, apiServiceConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { publishFacade } from '@angular/compiler';
import { TranslateModule } from '@ngx-translate/core';
import { PriorityPipe } from '../../pipes/priority.pipe';
registerLocaleData(es);

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RangePipe,
    PriorityPipe
  ],
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
export class TodoComponent implements OnChanges {

  constructor(
  //  private readonly apiService: ApiService
  @Attribute('sprint') public sprint:string
  ){
    // console.log('TodoComponent',apiService.instanceId);
  
   }
   
   @Input({ required: true}) todoData!: NTodo.TodoData;
   
   @Output() onClickIcon = new EventEmitter<NTodo.TodoData>();
   
   ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
   }

  // get priority(): string {
  //   switch (this.todoData.priority) {
  //     case NTodo.Priority.LOW:
        
  //       return NTodo.PriorityText.LOW;
    
  //     case NTodo.Priority.MEDIUM:
        
  //       return NTodo.PriorityText.MEDIUM;
    
  //     default:
  //       return NTodo.PriorityText.HIGH;
  //   }
    
  // }

  // get progress() {
  //   return this.todoData.progress * 100;
  // }

  // get range() {
   
  // }

}
