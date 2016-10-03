import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import {TodoModel} from '../../shared/todo-model';

/*
  Generated class for the AddTaskModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'add-task-modal-page',
  templateUrl: 'add-task-modal.html',
})
export class AddTaskModalPage {

  public model:TodoModel;
  public title:string = "Add new task";
  public buttonText:string = "ADD";

  constructor(private viewCtrl: ViewController, private params:NavParams) {
    if(this.params.get('todo')){
      this.model = TodoModel.clone(this.params.get('todo'));
      this.title = "Edit task";
      this.buttonText = "Save changes";
    }
    else{
      let listId = this.params.get('listId');
      this.model = new TodoModel('', listId);
    }
  }

  submit(){
    this.viewCtrl.dismiss(this.model);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
