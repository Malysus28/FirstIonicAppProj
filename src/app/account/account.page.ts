import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';



@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;

  constructor( private modalController: ModalController, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    this.loadStoredImage();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        this.selectedImage = reader.result;
        await this.storage.set('avatar', this.selectedImage);
      };
      reader.readAsDataURL(file);
    }
  }

  async loadStoredImage() {
    const storedImage = await this.storage.get('avatar');
    if (storedImage) {
      this.selectedImage = storedImage;
    }
  }

  // this function is currently not active 
  goBack() {
    this.modalController.dismiss();
  }

  

}
