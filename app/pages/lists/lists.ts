import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodosPage } from '../todos/todos';

/*
  Generated class for the ListsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/lists/lists.html',
})
export class ListsPage {

  constructor(private navCtrl: NavController) {}

  goToList(){
    this.navCtrl.push(TodosPage);
  }

}
