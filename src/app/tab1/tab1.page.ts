import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;
  tasks: any[] = [];

  constructor(
    private modalController: ModalController,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();        //Create storage 
    this.loadTasks();                //Load tasks from storage  
    this.loadStoredImage();             //Load stored image 
  }
  // Function to select an image

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();      //Read file
      reader.onload = async () => {
        this.selectedImage = reader.result;           //set selected image
        await this.storage.set('avatar', this.selectedImage);  //Store image
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

  // Load tasks from storage
  async loadTasks() {
    const storedTasks = await this.storage.get('tasks');    //Get tasks from storage
    if (storedTasks) {
      this.tasks = storedTasks;
    }
  }

  // Save tasks to storage
  async saveTasks() {
    await this.storage.set('tasks', this.tasks);  //Save tasks to storage
  }

  // Go to check productivity page
  onClickPro() {
    this.router.navigate(['/pro']);
  }

  onClickLogin() {
    this.router.navigate(['/account']);
  }

  // Ref and sync addTask from Modal1
  async addTask() {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {}
    });

    // Event listener for data
    modal.onDidDismiss().then((retval: any) => {
      if (retval.data) {
        this.tasks.push(retval.data);
        this.saveTasks(); // Save tasks after adding a new one
      }
    });

    return modal.present();
  }

  // Function to delete a task
  deleteTask(i: number) {
    this.tasks.splice(i, 1);
    this.saveTasks(); // Save tasks after deleting one
  }

  // When complete is clicked
  completeTask(i: number) {
    this.tasks[i].completed = !this.tasks[i].completed;
    this.saveTasks(); // Save tasks after toggling completion
  }

  // Function to edit a task
  async editTask(i: number) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        taskName: this.tasks[i].taskName,
        isEditing: true
      }
    });

    modal.onDidDismiss().then((retval: any) => {
      if (retval.data !== undefined) {
        this.tasks[i] = retval.data;
        this.saveTasks(); // Save tasks after editing one
      }
    });

    return modal.present();
  }
}
