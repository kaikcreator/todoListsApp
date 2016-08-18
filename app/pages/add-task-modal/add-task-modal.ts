import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

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

  constructor(private viewCtrl: ViewController) {

  }

  submit(){
    this.viewCtrl.dismiss(this.model);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
