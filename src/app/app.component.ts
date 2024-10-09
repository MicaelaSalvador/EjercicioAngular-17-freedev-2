import { I18nService } from './services/i18n.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnInit, Optional, Self, SkipSelf } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
import { NTodo } from './models/todo.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule } from '@angular/forms';
import { HighlightedDirective } from './directives/highlighted.directive';
 import { ApiService } from './services/api.service';
import { interval, Observable } from 'rxjs';
import { FilterPipe } from './pipes/filter.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TodoComponent,
    CommonModule,
    HeaderComponent,
    FormsModule,
    HighlightedDirective,
    FilterPipe,
    TranslateModule
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
  // changeDetection:ChangeDetectionStrategy.Default
  // changeDetection:ChangeDetectionStrategy.OnPush
  
})
export class AppComponent implements OnInit, DoCheck {

  // todos: NTodo.TodosResponse = {totalRecords: 0, data: []};
  todos: NTodo.TodoData[]= [];

  counter=0;

  // counter$!:Observable<number>;

  isloaded=false;

  searchText='';

  constructor(
  // @Self()  private readonly apiService: ApiService
   //@SkipSelf()  private readonly apiService: ApiService
  //  @Optional()  private readonly apiService: ApiService
   private readonly apiService: ApiService,
   private readonly cd:ChangeDetectorRef,
   private  translate: TranslateService,
   private i18nService:I18nService
  ) {
    // console.log('AppComponent',apiService.instanceId);
    // this.counter$ = interval(1000);
  //  this.translate.setDefaultLang('es');
  //  this.translate.use('es');
    sessionStorage.setItem('lang','es');

    this.translate.setTranslation('es',this.i18nService.getSpanishData);
  }
 
  ngOnInit(): void {
    this.getTodos();
    this.translate.onLangChange.subscribe(val => {
      console.log(val);
      this.getTodos();
    });

      //  interval(1000).subscribe(val => this.counter = val); 
  }

  ngDoCheck(): void {
    // console.log('ngDoCheck');
    // if(this.isloaded){
    //   console.log('isloaded')
    //   this.cd.markForCheck();
    //   this.isloaded=false;
    // }
  }


  private getTodos() {
    // this.apiService.get<NTodo.TodosResponse>().subscribe(val => this.todos = val.data);
    this.apiService.get<NTodo.TodosResponse>().subscribe(val => {
      this.todos = val.data;
      // this.cd.markForCheck();
      this.isloaded=true;
    });
  }

  deleteTodo(item: NTodo.TodoData) {
    this.apiService.delete<NTodo.TodosResponse>(item.id).subscribe(todos => this.todos = todos.data);
  }

  updateTodo(evt:Event,item : NTodo.TodoData) {

    const val = (evt.target as HTMLTextAreaElement).value;

    const todoCopy={... this.todos[0], descripcion:'nuevo valor'};
    const todos =[... this.todos];
    todos[0]=todoCopy;

    this.todos=[];
    this.todos=todos;
    // item={...item, description:val};
    // const todoCopy = {...this.todos[0],description:'nuevo valor' }
    // this.todos[0]=todoCopy;
    // esto estaba  comentado
    // this.apiService.put(item, item.id).subscribe(console.log);

    // esto no  estaba  comentado
    // this.apiService.patch({ description: item.description}, item.id).subscribe(console.log);
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
