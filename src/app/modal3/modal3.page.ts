import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-modal3',
  templateUrl: './modal3.page.html',
  styleUrls: ['./modal3.page.scss'],
})
export class Modal3Page implements OnInit {
  // initialize properties
  listItemName= ""

  // initialize class instances
  constructor(private navParams:NavParams,
     private modalController: ModalController, 
     ) { }

  // initialize componenets    
  ngOnInit() {
    this.listItemName = this.navParams.get ('listItemName');
    
  }

  // dissmiss modal and pass information 
  closemodal() {
    this.modalController.dismiss({ listItemName: this.listItemName, });
  }
  
  // back button in tool bar 
  goBack() {
    this.modalController.dismiss();
  }

}
