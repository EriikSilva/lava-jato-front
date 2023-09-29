import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaveClienteDialogComponent } from './edit-save-cliente.dialog.component';

describe('EditSaveClienteDialogComponent', () => {
  let component: EditSaveClienteDialogComponent;
  let fixture: ComponentFixture<EditSaveClienteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSaveClienteDialogComponent]
    });
    fixture = TestBed.createComponent(EditSaveClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
