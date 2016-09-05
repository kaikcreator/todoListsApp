import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { TodosPage } from '../todos/todos';
import { ListsService } from '../../shared/lists-service';

/*
  Generated class for the ListsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/lists/lists.html',
  providers: [ListsService]
})
export class ListsPage {

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private listsService: ListsService) {}

  goToList(){
    this.navCtrl.push(TodosPage);
  }

  addNewList(name:string){
    this.listsService.addList(name);
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
          handler: data => {this.addNewList(data.name);}
        }
      ]
    });

    addListAlert.present();
  }

}
