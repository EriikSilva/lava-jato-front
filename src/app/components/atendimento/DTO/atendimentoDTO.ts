export interface FinalizarServicoDTO {
    nr_atendimento_p: string;
    nr_servico_p:     string;
}

export interface AgendamentosDTO {
    horario_p:  string;
    cd_cliente_p: number;
    cd_usuario_p: number;
    cd_servico_p: number[];
    placa_p:      string;
    cd_veiculo_p: number;
}
