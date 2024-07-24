import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { Chart } from 'chart.js/auto';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  // categories array 
  categories = ['University', 'Personal', 'Household', 'Work', ];

  // initialize properties
    taskName= ""
    taskCategory = ""
    
  // initialize class instances
  constructor(private navParams:NavParams, private modalController: ModalController) { }

  // initialize componenets 
  ngOnInit() {
    this.taskName = this.navParams.get ('taskName');
    this.taskCategory = this.navParams.get ('taskCategory');
  }

  // dissmiss modal and pass information 
  closemodal() {
    this.modalController.dismiss({
       taskName: this.taskName, 
       taskCategory: this.taskCategory, 
        });
  }

  // select category from index function 
  SelectCat (index:number) {
    this.taskCategory=this.categories [index]
    console.log(this.SelectCat);

  }

  // back button in tool bar 
  goBack() {
    this.modalController.dismiss();
  }

}