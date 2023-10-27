import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarWashLoaderComponent } from './car-wash-loader.component';

describe('CarWashLoaderComponent', () => {
  let component: CarWashLoaderComponent;
  let fixture: ComponentFixture<CarWashLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarWashLoaderComponent]
    });
    fixture = TestBed.createComponent(CarWashLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
