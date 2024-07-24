import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.page.html',
  styleUrls: ['./modal2.page.scss'],
})
export class Modal2Page implements OnInit {

    // categories array 
    categories = ['University', 'Personal', 'Household', 'Work' ];

    // Define properties
    projName= ""
    projCategory = ""
    currentDate=""
    projDate=""
    
  // initialize class instances
  constructor(private navParams:NavParams, private modalController: ModalController) { }

  // initialize componenets to pass through
  ngOnInit() {
    this.projName = this.navParams.get ('projName');
    this.projCategory = this.navParams.get ('projCategory');
    this.projDate = this.navParams.get('projDate') || new Date().toISOString();
    console.log(this.projDate);


  }
  
  // dissmiss modal and pass information 
  closemodal2() {
    this.modalController.dismiss({
      projName: this.projName, 
      projCategory: this.projCategory, 
      projDate: this.projDate
        });
  }

  // Select category function 
  selectCategory(index: number) {
    this.projCategory = this.categories[index];
    console.log('Selected category:', this.projCategory);
  }

  // back button in tool bar 
  goBack() {
    this.modalController.dismiss();
  }

}
