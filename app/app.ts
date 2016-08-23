import {Component} from '@angular/core';
import { disableDeprecatedForms, provideForms} from '@angular/forms';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TodosPage} from './pages/todos/todos';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = TodosPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, 
  [disableDeprecatedForms(), provideForms()]
).catch(err => console.log(err));
