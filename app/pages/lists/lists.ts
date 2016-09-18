import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { TodosPage } from '../todos/todos';
import { ListsService } from '../../shared/lists-service';
import { ListModel } from '../../shared/list-model';

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

  private selectedList:ListModel = null;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private listsService: ListsService, private loadingCtrl: LoadingController) {}

  goToList(list:ListModel){
    this.clearSelectedList();
    this.navCtrl.push(TodosPage, {list} );
  }

  addNewList(name:string){
    let loader = this.loadingCtrl.create();
    loader.present();
    this.listsService.addList(name)
    .subscribe(list => {
      this.goToList(list);
      loader.dismiss();
    }, error => {loader.dismiss();});
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
          handler: data => {
            let navTransition = addListAlert.dismiss();
            navTransition.then(()=>{this.addNewList(data.name)});
          }
        }
      ]
    });

    addListAlert.present();
  }


  clearSelectedList(){
    this.selectedList = null;
  }

  selectList(list:ListModel){
    if(this.selectedList == list){
      this.clearSelectedList();
    }
    else{
      this.selectedList = list;
    }
  }

  removeSelectedList(){
    console.log("this list should be removed");
    this.selectedList = null;
  }

}
