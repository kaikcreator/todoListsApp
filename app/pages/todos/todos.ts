import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';

import { TodoModel } from '../../shared/todo-model';
import { TodoService } from '../../shared/todo-service';
import { AddTaskModalPage } from '../add-task-modal/add-task-modal';
import { PrioritizedTodosPipe } from '../../pipes/PrioritizedTodosPipe';
import { DoneTodosPipe } from '../../pipes/DoneTodosPipe';

/*
  Generated class for the TodosPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/todos/todos.html',
  providers: [TodoService],
  pipes: [PrioritizedTodosPipe, DoneTodosPipe]
})
export class TodosPage {

  private toogleTodoTimeout = null;

  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private todoService:TodoService, 
    private platform: Platform) {}
  

  setTodoStyles(item:TodoModel){

    let styles = {
      'text-decoration': item.isDone ? 'line-through' : 'none',
      'font-weight': item.isImportant ? '600' : 'normal'
    };

    return styles;

  }


  toogleTodo(todo:TodoModel){
    if(this.toogleTodoTimeout)
      return;

    this.toogleTodoTimeout = setTimeout(()=>{
      this.todoService.toogleTodo(todo);
      this.toogleTodoTimeout = null;
    }, this.platform.is('ios') ? 0 : 300);
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


  showEditTodo(todo:TodoModel){
    let modal = this.modalCtrl.create(AddTaskModalPage, {todo});
    modal.present();

    modal.onDidDismiss(data => {
      if(data){
        this.todoService.updateTodo(todo, data);
      }
    });
  }

}
