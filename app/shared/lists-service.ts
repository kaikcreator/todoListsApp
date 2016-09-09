import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage, LocalStorage} from 'ionic-angular';

import { ListModel } from './list-model';

/*
  Generated class for the ListsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ListsService {

  public lists:ListModel[] = [];
  private local:Storage;

  constructor(private http: Http) {
    this.local = new Storage(LocalStorage);
    this.getLists();
  }

  private getLists(){
    this.getFromLocal();
  }

  public addList(name:string){
    let list = new ListModel(name, this.lists.length);
    this.lists = [...this.lists, list];
    return list;
  }

  private getFromLocal(){
    return this.local.get('lists').then(
      data => {
        let localLists:ListModel[] = [];
        if(data){
          data = JSON.parse(data);
          for(let list of data){
            localLists.push(new ListModel(list.name, list.id));
          }
        }
        this.lists = localLists;
      }
    );
  }

  public saveLocally(){
    this.local.set('lists', JSON.stringify(this.lists));
  }
}

