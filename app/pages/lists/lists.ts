import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {}

  goToList(){
    this.navCtrl.push(TodosPage);
  }

  showAddList(){
    let addListAlert = this.alertCtrl.create({
      title: 'New list',
      message: 'Give a name to the new list',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data =>{}
        },
        {
          text:'Add',
          handler: data => {this.goToList();}
        }
      ]
    });

    addListAlert.present();
  }

}
