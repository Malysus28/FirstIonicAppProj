import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Chart } from 'chart.js/auto';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.page.html',
  styleUrls: ['./pro.page.scss'],
})
export class ProPage implements OnInit {
  chart: any;

  constructor(private modalController: ModalController, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadTasks();
  }

  goBack() {
    this.modalController.dismiss();
  }

  async loadTasks() {
    const storedTasks = await this.storage.get('tasks');
    if (storedTasks) {
      const completedTasks = storedTasks.filter((task: any) => task.completed).length;
      const incompleteTasks = storedTasks.length - completedTasks;

      this.createChart(completedTasks, incompleteTasks);
    }
  }

  createChart(completedTasks: number, incompleteTasks: number) {
    const ctx = document.getElementById('taskChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed Tasks', 'Incomplete Tasks'],
        datasets: [
          {
            label: '# of Tasks',
            data: [completedTasks, incompleteTasks],
            backgroundColor: ['#4caf50', '#f44336'],
            hoverBackgroundColor: ['#66bb6a', '#ef5350']
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    });
  }
}