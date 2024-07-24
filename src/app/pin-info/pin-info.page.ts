import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-pin-info',
  templateUrl: './pin-info.page.html',
  styleUrls: ['./pin-info.page.scss'],
})
export class PinInfoPage implements OnInit {
  pinData: any;
  locationName: string = '';

  constructor(private route: ActivatedRoute, private storage: Storage) {}

  async ngOnInit() {
    // Get the pin data from the route parameters
    this.route.queryParams.subscribe(params => {
      if (params && params['pinData']) {
        this.pinData = JSON.parse(params['pinData']);
      }
    });

    // Initialize the storage
    await this.storage.create();
    this.loadLocationName();
  }

  async loadLocationName() {
    const storedName = await this.storage.get(this.getStorageKey());
    if (storedName) {
      this.locationName = storedName;
    }
  }

  async saveLocationName() {
    await this.storage.set(this.getStorageKey(), this.locationName);
    alert('Location name saved!');
  }

  getStorageKey(): string {
    return `location_${this.pinData.lat}_${this.pinData.lng}`;
  }
}