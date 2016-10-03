import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AddTaskModalPage } from '../pages/add-task-modal/add-task-modal';
import { ListsPage } from '../pages/lists/lists';
import { TodosPage } from '../pages/todos/todos';
import { PrioritizedTodosPipe } from '../pipes/PrioritizedTodosPipe';
import { DoneTodosPipe } from '../pipes/DoneTodosPipe';
import { ListsService } from '../shared/lists-service';
import { TodoService } from '../shared/todo-service';

@NgModule({
  declarations: [
    MyApp,
    AddTaskModalPage,
    ListsPage,
    TodosPage,
    PrioritizedTodosPipe,
    DoneTodosPipe

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddTaskModalPage,
    ListsPage,
    TodosPage

  ],
  providers: [
    ListsService,
    TodoService
  ]
})
export class AppModule {}
