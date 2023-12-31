import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from './clientes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientEditDTO, ClienteDeleteDTO, ClienteGetDTO, VeiculosCliente } from './DTO/clientesDTO';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { MaskUtils } from '../../utils/Cpf_Cnpj_Validations';
import { Table } from 'primeng/table';
import { SaveEditClientComponent } from './dialogs/save-edit-client/save-edit-client.component';
import { CarDetailsComponent } from './dialogs/car-details/car-details.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [MessageService, MaskUtils, ConfirmationService],
})
export class ClientesComponent implements OnInit, OnDestroy {
  
  @ViewChild('dt') dt: Table | undefined;
  @ViewChild('SaveEditClientComponent') SaveEditClientComponent: SaveEditClientComponent | undefined;
  @ViewChild('CarDetailsComponent') CarDetailsComponent:CarDetailsComponent | undefined;

  private destroy$: Subject<void> = new Subject<void>();

  position:         string = 'center';
  clients:          ClienteGetDTO[] = [];
  carsType:         any;
  cd_cliente:       number = 0;
  messages:         Message[] = [];
  clientsVehicles?: Array<VeiculosCliente> | any


  editMode:        boolean = false;
  saveMode:        boolean = false
  clientDialog:    boolean = false;
  carClientDialog: boolean = false;
  newCarDialog:    boolean = false;
  requisicaoCompleta: boolean = false
  isLoading: boolean = false

  constructor(
    private clientsService:      ClientesService,
    private messageService:      MessageService,
    private maskUtils:           MaskUtils,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.clientsService.setTitle("Clientes - Lava Jato")

    this.getClients();
  }

  newClientCarForm = new FormGroup({
    placa:           new FormControl('', Validators.required),
    modelo:          new FormControl('', Validators.required),
    cd_tipo_veiculo: new FormControl('', Validators.required)
  })


  /********************** REQUESTS ***************************/
  getClients() {
    this.isLoading = true
    this.requisicaoCompleta = false
    this.clientsService.getClients()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.isLoading = false
          this.requisicaoCompleta = true
        }, 1000)

        const { data } = res;
        this.clients = data;
      },
      error:(res: any) => {
        this.isLoading = false
        console.log(res.error.message);
      },
    });
  }

  deleteClient(cliente:ClienteDeleteDTO) {
    this.isLoading = true
    const { cd_cliente } = cliente;
    this.clientsService.deleteClient(cd_cliente as any).subscribe({
      next: (res: any) => {
        const { message } = res
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: message,
        });
        this.getClients();
      },
      error: (res: any) => {
        this.isLoading = false
        const { error } = res
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao deletar',
          detail: error.error,
        });
      },
    });
  }

  
 confirmDelete(event: Event, cliente: ClienteGetDTO) {
  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: 'Deseja Excluir Este Cliente?',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim',
    rejectLabel: 'Não',
    accept: () => {
      this.deleteClient(cliente);
    },
  });
}

  /*******************DIALOG********************/
  openNew() {
    this.SaveEditClientComponent?.resetarFormulario();
    this.saveMode     = true
    this.editMode     = false
    this.clientDialog = true;
  }

  editClientModal(cliente: ClientEditDTO) {
    this.editMode      = true;
    this.saveMode      = false
    this.clientDialog  = true;
    this.SaveEditClientComponent?.editClientModal(cliente)
  }

  carClientModal(position: string, cliente:ClienteGetDTO){
    const { cd_cliente } = cliente
    this.cd_cliente      =  cd_cliente

    this.CarDetailsComponent?.carClientModal(position, cliente)
  }

  formatCpfCnpj(value: string): string {
    return this.maskUtils.formatCpfCnpj(value);
  }
  
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getStatusClass(status: string): string {
    return status === 'A' ? 'ativo' : 'inativo';
  }
  

  onDialogClosed() {
    this.clientDialog    = false;
    this.carClientDialog = false
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
