import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage, LocalStorage } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';  

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

  private postNewTodoToServer(todo:TodoModel): Observable<TodoModel>{
    let observable = this.http.post(`${AppSettings.API_ENDPOINT}/lists/${todo.listId}/todos`,
    {
      description: todo.description,
      isImportant: todo.isImportant,
      isDone: todo.isDone
    })
    .map(response => response.json())
    .map(todo => TodoModel.fromJson(todo))
    .share();

    return observable;
  }

  private updateTodoInServer(todo:TodoModel): Observable<TodoModel>{
    let observable = this.http.put(`${AppSettings.API_ENDPOINT}/todos/${todo.id}`,
    {
      description: todo.description,
      isImportant: todo.isImportant,
      isDone: todo.isDone,
      listId: todo.listId
    })
    .map(response => response.json())
    .map(todo => TodoModel.fromJson(todo))
    .share();

    return observable;
  }  


  public saveLocally(id:number){
    this.local.set(`list/${id}`, JSON.stringify(this.todos));
  }

  addTodo(todo:TodoModel){
    let observable = this.postNewTodoToServer(todo);

    observable.subscribe(
      (todo:TodoModel) =>{
        this.todos = [...this.todos, todo];
        this.saveLocally(todo.listId);
      },
      error => console.log("Error trying to post a new list")
    );

    return observable;
    
  }

  removeTodo(todo:TodoModel){
    const index = this.todos.indexOf(todo);
    this.todos = [
      ...this.todos.slice(0, index),
      ...this.todos.slice(index+1)];
  }

  updateTodo(originalTodo:TodoModel, modifiedTodo:TodoModel):Observable<TodoModel>{
    let observable = this.updateTodoInServer(modifiedTodo);

    observable.subscribe((todo:TodoModel) =>{
      const index = this.todos.indexOf(originalTodo);
      this.todos = [
        ...this.todos.slice(0,index),
        todo,
        ...this.todos.slice(index+1)];
    },
    error => console.log("Error trying to update todo item")
    );

    return observable;
  }

  toogleTodo(todo:TodoModel){

    let updatedTodo = TodoModel.clone(todo);
    updatedTodo.isDone = !todo.isDone;

    return this.updateTodo(todo, updatedTodo).subscribe(
      ()=>{},
      ()=>{this.loadFromList(todo.listId)}
    )   
  }

}

