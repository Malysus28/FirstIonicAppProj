import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pro2Page } from './pro2.page';

describe('Pro2Page', () => {
  let component: Pro2Page;
  let fixture: ComponentFixture<Pro2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Pro2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
