import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Chart } from 'chart.js/auto';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-pro2',
  templateUrl: './pro2.page.html',
  styleUrls: ['./pro2.page.scss'],
})
export class Pro2Page implements OnInit {
  chart: any;

  constructor(private modalController: ModalController, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadProjects();
  }

  goBack() {
    this.modalController.dismiss();
  }

  async loadProjects() {
    const storedProjects = await this.storage.get('projects');
    if (storedProjects) {
      const completedProjects = storedProjects.filter((project: any) => project.completed).length;
      const incompleteProjects = storedProjects.length - completedProjects;

      this.createChart(completedProjects, incompleteProjects);
    }
  }

  createChart(completedProjects: number, incompleteProjects: number) {
    const ctx = document.getElementById('projectChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed Projects', 'Incomplete Projects'],
        datasets: [
          {
            label: '# of Projects',
            data: [completedProjects, incompleteProjects],
            backgroundColor: ['#008000', '#FFA500'],
            hoverBackgroundColor: ['#66bb6a', '#ffcc80']
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