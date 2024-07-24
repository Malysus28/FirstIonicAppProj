import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal2Page } from '../modal2/modal2.page';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;
  projects: any[] = [];

  constructor(
    private modalController: ModalController,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();    //Create storage
    this.loadProjects();            //Load projects from storage
    this.loadStoredImage();         //Load stored image
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

  // Load projects from storage
  async loadProjects() {
    const storedProjects = await this.storage.get('projects');
    if (storedProjects) {
      this.projects = storedProjects;
    }
  }

  // Save projects to storage
  async saveProjects() {
    await this.storage.set('projects', this.projects);
  }

  onClickLogin() {
    this.router.navigate(['/account']);
  }

  // ref and sync addProj from Modal2
  async addProj() {
    const modal2 = await this.modalController.create({
      component: Modal2Page,
      componentProps: {}
    });

    // Event listener (edit Date)
    modal2.onDidDismiss().then((ret: any) => {
      if (ret.data && ret.data.projDate) {
        this.projects.push({
          projName: ret.data.projName,
          projCategory: ret.data.projCategory,
          projDate: ret.data.projDate,
          completed: false // initialize the completed state
        });
        this.saveProjects(); // Save projects after adding a new one
      }
    });

    return modal2.present();
  }

  // Function to delete a project
  deleteProj(i: number) {
    this.projects.splice(i, 1);
    this.saveProjects(); // Save projects after deleting one
  }

  // Function to toggle completed state
  toggleCompleted(i: number) {
    this.projects[i].completed = !this.projects[i].completed;
    this.saveProjects(); // Save projects after toggling completion
  }

  // When complete is clicked
  completeProj(i: number) {
    this.projects[i].completed = !this.projects[i].completed;
    this.saveProjects(); // Save projects after toggling completion
  }

  // Go to check productivity page
  onClickPro2() {
    console.log('Navigating to pro page...');
    this.router.navigate(['/pro2']);
  }

  // Function to edit a project
  async editProj(i: number) {
    const modal2 = await this.modalController.create({
      component: Modal2Page,
      componentProps: {
        projName: this.projects[i].projName,
        projCategory: this.projects[i].projCategory,
        projDate: this.projects[i].projDate,
        completed: this.projects[i].completed,
        isEditing: true
      }
    });

    // Event listener, dismiss
    modal2.onDidDismiss().then((ret: any) => {
      if (ret.data !== undefined) {
        this.projects[i] = ret.data;
        this.saveProjects(); // Save projects after editing one
      }
    });

    return modal2.present();
  }
}
