import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the TodosPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/todos/todos.html',
})
export class TodosPage {

  private todos:any[];

  constructor(private navCtrl: NavController) {

    this.todos = [
      {
        description: "esto es una tarea",
        isDone: false
      },
      {
        description: "esto es otra tarea",
        isDone: false
      },
      {
        description: "esto es la tercera tarea",
        isDone: false
      }            
    ];

  }

}
