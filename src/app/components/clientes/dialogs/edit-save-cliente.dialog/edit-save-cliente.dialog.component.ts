import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-save-cliente.dialog',
  templateUrl: './edit-save-cliente.dialog.component.html',
  styleUrls: ['./edit-save-cliente.dialog.component.scss']
})
export class EditSaveClienteDialogComponent {

  @Input() visible:  boolean = false;
  @Input() saveMode: boolean = false;
  @Input() editMode: boolean = false;
  @Input() clientDialog: boolean = false;

  @Output() saveClicked = new EventEmitter<void>();
  @Output() cancelClicked = new EventEmitter<void>();

 

}
