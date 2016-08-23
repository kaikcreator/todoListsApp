import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import {TodoModel} from '../../shared/todo-model';

/*
  Generated class for the AddTaskModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add-task-modal/add-task-modal.html',
})
export class AddTaskModalPage {

  private model = new TodoModel('');
  private title:string = "Add new task";
  private buttonText:string = "ADD";

  constructor(private viewCtrl: ViewController, private params:NavParams) {
    if(this.params.get('todo')){
      this.model = TodoModel.clone(this.params.get('todo'));
      this.title = "Edit task";
      this.buttonText = "Save changes";
    }
  }

  submit(){
    this.viewCtrl.dismiss(this.model);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
