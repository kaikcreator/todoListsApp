import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { TodoModel } from './todo-model';

/*
  Generated class for the TodoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TodoService {

  private todos:TodoModel[];

  constructor(private http: Http) {

    this.getTodos();
  }

  private getTodos(){
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

  addTodo(todo:TodoModel){
    this.todos.push(todo);
  }

  toogleTodo(todo:TodoModel){
    todo.isDone = !todo.isDone;
  }

}
