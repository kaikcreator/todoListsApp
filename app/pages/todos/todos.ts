import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TodoModel } from '../../shared/todo-model';

/*
  Generated class for the TodosPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/todos/todos.html',
})
export class TodosPage {

  private todos:TodoModel[];

  constructor(private navCtrl: NavController) {

    this.todos = [
      new TodoModel("this is an element"),
      new TodoModel("this is an element"),
      new TodoModel("this is an element"),
      new TodoModel("this is an element"),
      new TodoModel("this is an element"),          
      new TodoModel("this is an element", true),
      new TodoModel("this is an element"),
      new TodoModel("this is an element", false, true),
      new TodoModel("this is an element"),
      new TodoModel("this is an element")
    ];

  }
  

  setTodoStyles(item:TodoModel){

    let styles = {
      'text-decoration': item.isDone ? 'line-through' : 'none',
      'font-weight': item.isImportant ? '600' : 'normal'
    };

    return styles;

  }

}
