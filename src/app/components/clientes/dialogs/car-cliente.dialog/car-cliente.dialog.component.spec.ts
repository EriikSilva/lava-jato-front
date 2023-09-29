import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarClienteDialogComponent } from './car-cliente.dialog.component';

describe('CarClienteDialogComponent', () => {
  let component: CarClienteDialogComponent;
  let fixture: ComponentFixture<CarClienteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarClienteDialogComponent]
    });
    fixture = TestBed.createComponent(CarClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
