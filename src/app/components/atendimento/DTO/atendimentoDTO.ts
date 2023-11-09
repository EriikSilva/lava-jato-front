export interface FinalizarServicoDTO {
    nr_atendimento_p: string;
    nr_servico_p:     string[];
}

export interface AgendamentosDTO {
    horario_p:  string;
    cd_cliente_p: number;
    cd_usuario_p: string | number | null;
    cd_servico_p: number[];
    placa_p:      string;
    cd_veiculo_p: number;
}

export interface AtendimentoDTO {
    dh_inicio_servico: string;
    dh_fim_servico:    null;
    nr_atendimento:    number;
    nr_seq_servico:    number;
    tempo_servico:     null;
    cd_veiculo:        number;
    placa:             string;
    cd_servico:        number;
    tipo_veiculo:      string;
    modelo_veiculo:    string;
    valor:             number;
    servico:           string;
    status_servico:    string;
    cliente:           string;
    cd_cliente:        number;
    contato:           string;
}

export interface DadosServico {
    nr_servico_atendimento: number;
    cd_veiculo:             number;
    placa:                  string;
    cd_servico:             number;
    tipo_veiculo:           string;
    modelo_veiculo:         string;
    valor:                  number;
    servico:                string;
    status_servico:         string;
    dh_inicio_servico:      string;
    dh_fim_servico:         null;
}
export interface JSONServico {
    cd_servico:     number;
    servico:        string;
    tipo_veiculo:   string;
    status_servico: string;
    placa:          string;
    modelo_veiculo: string;
    valor:          number;
    nr_servico:     number;
}

export interface ItensSelecionadosDTO {
    nr_atendimento: number;
    cd_servico:     number;
    servico:        string;
    tipo_veiculo:   string;
    status_servico: string;
    placa:          string;
    modelo_veiculo: string;
    valor:          number;
    nr_seq_servico: number;
}


export interface ServicoClienteDTO {
    nr_atendimento: number;
    cd_servico:     number;
    servico:        string;
    tipo_veiculo:   string;
    status_servico: string;
    placa:          string;
    modelo_veiculo: string;
    valor:          number;
    nr_servico:     number;
}


export interface ServicosFinalizadosDTO {
    dh_inicio_servico: string;
    dh_fim_servico:    string;
    nr_seq_servico:    number;
    tempo_servico:     null;
    cd_veiculo:        number;
    placa:             string;
    cd_servico:        number;
    tipo_veiculo:      string;
    modelo_veiculo:    string;
    valor:             number;
    servico:           string;
    status_servico:    string;
    cliente:           string;
    cd_cliente:        number;
    contato:           string;
}


export interface PostPagamentoDTO {
    nr_atendimento_p: number ;
    vl_desconto_p:    number;
    cd_usuario_p:     number | null;
    perc_desc_p:      number;
    dh_vencimento_p:  string;
    pagamentos:       Pagamento[];
}

export interface Pagamento {
    cd_tipo_pagamento: number;
    valor:             number;
}
