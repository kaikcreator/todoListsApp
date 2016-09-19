import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage, LocalStorage } from 'ionic-angular';

import { TodoModel } from './todo-model';
import { AppSettings } from './app-settings';

/*
  Generated class for the TodoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TodoService {

  private todos:TodoModel[] = [];
  private local:Storage;

  constructor(private http: Http) {
    this.local = new Storage(LocalStorage);
  }

  public loadFromList(id:number){
    this.getFromLocal(id).then(() =>{
      this.loadFromServer(id);
    })
  }

  getFromLocal(id:number){
    return this.local.get(`list/${id}`).then(
      data =>{
        if(!data){
          this.todos = [];
          return;
        }
        data = JSON.parse(data);
        let localTodos:TodoModel[] = [];
        for(let todo of data){
          localTodos.push(TodoModel.clone(todo));
        }
        this.todos = localTodos;
      }
    )

  }

  private loadFromServer(id:number){
    this.http.get(`${AppSettings.API_ENDPOINT}/lists/${id}/todos`)
      .map(response => {
        return response.json();
      })
      .map((todos:Object[]) => {
        return todos.map(item => TodoModel.fromJson(item));
      })
      .subscribe(
        (result: TodoModel[]) =>{
          this.todos = result;
          this.saveLocally(id);
        },
        error => {
          console.log("Error loading lists from server ", error);
        }
      )
  }


  public saveLocally(id:number){
    this.local.set(`list/${id}`, JSON.stringify(this.todos));
  }

  addTodo(todo:TodoModel){
    this.todos = [...this.todos, todo];
  }

  removeTodo(todo:TodoModel){
    const index = this.todos.indexOf(todo);
    this.todos = [
      ...this.todos.slice(0, index),
      ...this.todos.slice(index+1)];
  }

  updateTodo(originalTodo:TodoModel, modifiedTodo:TodoModel){
    const index = this.todos.indexOf(originalTodo);
    this.todos = [
      ...this.todos.slice(0,index),
      modifiedTodo,
      ...this.todos.slice(index+1)];
  }

  toogleTodo(todo:TodoModel){
    let isDone = !todo.isDone;
    const todoIndex = this.todos.indexOf(todo);
    let updatedTodo = TodoModel.clone(todo);
    updatedTodo.isDone = isDone;

    this.todos = [
      ...this.todos.slice(0, todoIndex),
      updatedTodo,
      ...this.todos.slice(todoIndex+1)
    ];
    
  }

}

