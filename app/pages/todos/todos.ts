import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { TodoModel } from '../../shared/todo-model';
import { TodoService } from '../../shared/todo-service';
import { AddTaskModalPage } from '../add-task-modal/add-task-modal';

/*
  Generated class for the TodosPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/todos/todos.html',
  providers: [TodoService]
})
export class TodosPage {

  

  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private todoService:TodoService) {}
  

  setTodoStyles(item:TodoModel){

    let styles = {
      'text-decoration': item.isDone ? 'line-through' : 'none',
      'font-weight': item.isImportant ? '600' : 'normal'
    };

    return styles;

  }


  toogleTodo(todo:TodoModel){
    this.todoService.toogleTodo(todo);
  }

  removeTodo(todo:TodoModel){
    this.todoService.removeTodo(todo);
  }


  showAddTodo(){
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();

    modal.onDidDismiss(data => {
      if(data){
        this.todoService.addTodo(data);
      }
    });
  }

}
