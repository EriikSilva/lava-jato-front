import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrankensteinComponent } from './frankenstein.component';

describe('FrankensteinComponent', () => {
  let component: FrankensteinComponent;
  let fixture: ComponentFixture<FrankensteinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrankensteinComponent]
    });
    fixture = TestBed.createComponent(FrankensteinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
