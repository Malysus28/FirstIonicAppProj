import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Modal2Page } from './modal2.page';

describe('Modal2Page', () => {
  let component: Modal2Page;
  let fixture: ComponentFixture<Modal2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Modal2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
