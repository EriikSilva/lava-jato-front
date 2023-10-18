import { MessageService } from 'primeng/api';
import { ClientesService } from 'src/app/components/clientes/clientes.service';
import { CarrosService } from './../../../clientes/carros.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ServicosService } from 'src/app/components/servicos/servicos.service';
import { format, addDays } from 'date-fns';
import { AgendamentosDTO } from '../../DTO/atendimentoDTO';
import { AtendimentoService } from '../../atendimento.service';
@Component({
  selector: 'app-new-atendimento',
  templateUrl: './new-atendimento.component.html',
  styleUrls: ['./new-atendimento.component.scss'],
  providers: [MessageService],
})
export class NewAtendimentoComponent implements OnInit {
  constructor(
    private carrosService: CarrosService,
    private clienteService: ClientesService,
    private servicosService: ServicosService,
    private atendimentoService: AtendimentoService,
    private MessageService: MessageService
  ) {}

  @Input() atendimentoDialog: boolean = false;
  @Output() dialogClosed = new EventEmitter<void>();
  @Output() getAtendimentos = new EventEmitter<void>();

  clientes: any;
  veiculoCliente: any;
  placa: any;
  cd_veiculo: any;
  servicos: any;
  cd_servico_p: any;
  cd_cliente: any;
  noCarsValidation:boolean = false
  precoServicoFinal:any

  ngOnInit(): void {
    this.getClientes();
    this.getServicos();
  }

  newAtendimentoForm = new FormGroup({
    horario_p: new FormControl(''),
    cd_servico_p: new FormControl(''),
    cd_cliente_p: new FormControl('')
  });

  saveNewAtendimento() {
    const formValue = this.newAtendimentoForm.value;

    if (formValue.horario_p == '') {
      this.validateAndShowMessage(formValue.horario_p);
    }

    let horario_p = formValue.horario_p || '';
    horario_p = format(new Date(horario_p), 'yyyy-MM-dd HH:mm:ss');
    let cd_usuario_p = Number(localStorage.getItem('cd_usuario'));
    
    let bodyNewAtendimento: AgendamentosDTO = {
      horario_p,
      cd_cliente_p: this.cd_cliente,
      cd_usuario_p,
      cd_servico_p: this.cd_servico_p,
      placa_p: this.placa,
      cd_veiculo_p: this.cd_veiculo,
    };

    const isValid = this.validateAndShowMessage(bodyNewAtendimento);

    if (isValid) {
      this.atendimentoService.gerarAtendimento(bodyNewAtendimento).subscribe({
        next: (res: any) => {
          const { message } = res;
          this.closeDialog();
          this.getAtendimentos.emit();
          this.MessageService.add({
            severity: 'success',
            summary: 'Sucesso ao cadastrar',
            detail: message,
          });
      
          this.limparFormNovoAtendimento();
        },
        error: (res: any) => {
          this.MessageService.add({
            severity: 'error',
            summary: 'Erro ao cadastrar',
            detail: res.error.error,
          });
        },
      });
    }
  }

  private validateAndShowMessage(atendimento: any) {
    if (
      !atendimento.horario_p ||
      atendimento.horario_p.trim() === '' ||
      !atendimento.cd_usuario_p ||
      !atendimento.cd_servico_p
    ) {
      this.MessageService.add({
        severity: 'error',
        summary: 'Erro ao cadastrar',
        detail: 'Preencha os Campos Obrigatórios',
      });

      return false;
    }
    return true;
  }

  getCarrosCliente(cd_cliente: any) {
    this.carrosService.getVeiculoCliente(cd_cliente).subscribe({
      next: (res: any) => {
        const { data } = res;
        this.clientes = data;
      },
    });
  }

  getServicos() {
    this.servicosService.getServicos().subscribe((res: any) => {
      const { data } = res;

      const servicosConcatenados = data.map((servico: any) => ({
        ...servico,
        desc_vlr_servico: `${servico.desc_servico} - R$ ${servico.vlr_servico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      }));  
      this.servicos = servicosConcatenados
    });
  }

  getClientes() {
    this.clienteService.getClients().subscribe({
      next: (res: any) => {
        const { data } = res;
        this.clientes = data;
      },
    });
  }

  onDropdownChangeCliente(cliente: any) {
    const { value } = cliente;
    this.veiculoCliente = value;
    this.cd_cliente = value.cd_cliente;
    this.noCarsValidation = false
    this.getCarroCliente(value.cd_cliente);
  }

  getCarroCliente(cd_client: number) {
    this.carrosService.getVeiculoCliente(cd_client).subscribe({
      next: (res: any) => {
        const { data } = res;
        const carroConcatenado = data.map((veiculo:any) => ({
          ...veiculo,
          placaModeloConcatenado: `Modelo: ${veiculo.modelo} - Placa: ${veiculo.placa}`
        }))
        this.veiculoCliente = carroConcatenado
      },error:(res:any) => {
          this.noCarsValidation = true
      }
    });
  }

  limparFormNovoAtendimento(){
    this.noCarsValidation = false
    this.veiculoCliente = ""
    this.newAtendimentoForm.reset();
  }

  onDropdownChangeCarro(cliente: any) {
    const { value } = cliente;
    this.placa = value.placa;
    this.cd_veiculo = value.cd_veiculo;
  }

  onMultiSelectChangeServicos(servico: any) {
    const cd_servicoValores = servico.value.map((item: any) => item.cd_servico);
    this.cd_servico_p = cd_servicoValores;
    const somaVlrServico = servico.value.reduce((total:any, servico:any) => total + servico.vlr_servico, 0);
    this.precoServicoFinal = somaVlrServico
  }

  closeDialog() {
    this.atendimentoDialog = false;
    this.dialogClosed.emit();
    this.limparFormNovoAtendimento();
  }
}
