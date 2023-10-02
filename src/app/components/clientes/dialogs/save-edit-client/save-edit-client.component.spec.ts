import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEditClientComponent } from './save-edit-client.component';

describe('SaveEditClientComponent', () => {
  let component: SaveEditClientComponent;
  let fixture: ComponentFixture<SaveEditClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveEditClientComponent]
    });
    fixture = TestBed.createComponent(SaveEditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
