import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal3Page } from '../modal3/modal3.page';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;
  lists: any[] = [];

  constructor(
    private modalController: ModalController,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadLists();
    this.loadStoredImage();
  }

  // Function to select an image
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
// Load stored image
  async loadStoredImage() {
    const storedImage = await this.storage.get('avatar');
    if (storedImage) {
      this.selectedImage = storedImage;
    }
  }

  // Load lists from storage
  async loadLists() {
    const storedLists = await this.storage.get('lists');
    if (storedLists) {
      this.lists = storedLists;
    }
  }

  // Save lists to storage
  async saveLists() {
    await this.storage.set('lists', this.lists);
  }

  onClickLogin() {
    this.router.navigate(['/account']);
  }

  // ref Modal3 addList and sync
  async addList() {
    const modal = await this.modalController.create({
      component: Modal3Page,
      componentProps: {}
    });

    modal.onDidDismiss().then((retval: any) => {
      if (retval.data) {
        this.lists.push(retval.data);
        this.saveLists(); // Save lists after adding a new one
      }
    });

    return modal.present();
  }

  // Delete list item
  deleteList(i: number) {
    this.lists.splice(i, 1);
    this.saveLists(); // Save lists after deleting one
  }

  // ref Modal3 editList and sync, data
  async editList(i: number) {
    const modal = await this.modalController.create({
      component: Modal3Page,
      componentProps: {
        listItemName: this.lists[i].listItemName,
        isEditing: true
      }
    });

    modal.onDidDismiss().then((retval: any) => {
      if (retval.data !== undefined) {
        this.lists[i] = retval.data;
        this.saveLists(); // Save lists after editing one
      }
    });

    return modal.present();
  }

  // When checkbox is clicked
  toggleChecked(index: number) {
    this.lists[index].checked = !this.lists[index].checked;
    this.saveLists(); // Save lists after toggling checked state
  }
}
