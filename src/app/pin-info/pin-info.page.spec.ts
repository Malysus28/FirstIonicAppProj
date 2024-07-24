import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PinInfoPage } from './pin-info.page';

describe('PinInfoPage', () => {
  let component: PinInfoPage;
  let fixture: ComponentFixture<PinInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PinInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
