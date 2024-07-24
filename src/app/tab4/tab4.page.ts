import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras  } from '@angular/router';
import { Modal3Page } from '../modal3/modal3.page';
import { Storage } from '@ionic/storage-angular';
declare let google: any;

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit, AfterViewInit {
  @ViewChild('map', { static: true }) mapElement: any;
  map: any;
  addMarkerMode: boolean = false;
  savedMarkers: any[] = [];
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private router: Router, private storage: Storage) {}  

  async ngAfterViewInit() {
    await this.mapWithPosition();
    this.addMapClickListener();
    this.loadSavedMarkers();
  }

  ngOnInit() {
    console.log("ngOnInit MapPage");
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

  onClickLogin() {
    this.router.navigate(['/account']);  // Use router here
  }

  async mapWithPosition() {
    let latLng = await new google.maps.LatLng(43.0741904, -89.3809802);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = await new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  async mapWithCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        console.log(position.coords.latitude);
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.map.setCenter(pos);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  enableAddMarker() {
    this.addMarkerMode = true;
  }

  addMapClickListener() {
    this.map.addListener('click', (event: any) => {
      if (this.addMarkerMode) {
        this.addMarker(event.latLng);
        this.addMarkerMode = false; 
      }
    });
  }

  addMarker(location: any) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      animation: google.maps.Animation.DROP
    });

    marker.addListener('click', () => {
      this.viewPinInfo(location);
    });

    const markerData = {
      lat: location.lat(),
      lng: location.lng()
    };

    // Save marker location to the array and local storage
    this.savedMarkers.push(markerData);
    this.saveMarkersToLocalStorage();

    console.log('Marker added at:', location.toString());
  }

  viewPinInfo(location: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        pinData: JSON.stringify({ lat: location.lat(), lng: location.lng() })
      }
    };
    this.router.navigate(['pin-info'], navigationExtras);
  }

  saveMarkersToLocalStorage() {
    localStorage.setItem('savedMarkers', JSON.stringify(this.savedMarkers));
  }

  loadSavedMarkers() {
    const savedMarkersString = localStorage.getItem('savedMarkers');
    if (savedMarkersString) {
      this.savedMarkers = JSON.parse(savedMarkersString);
      this.savedMarkers.forEach(markerData => {
        const location = new google.maps.LatLng(markerData.lat, markerData.lng);
        this.addMarker(location);
      });
    }
  }
}