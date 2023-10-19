export interface FinalizarServicoDTO {
    nr_atendimento_p: string;
    nr_servico_p:     string;
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
    dadosAtendimento: DadosAtendimento;
}

export interface DadosAtendimento {
    nr_atendimento:           number;
    dh_inicio_atendimento:    string;
    valor_total:              number;
    qtd_servicos_atendimento: number;
    dh_fim_atendimento:       null;
    status_atendimento:       string;
    status_pagamento:         string;
    dadosCLiente:             DadosCLiente[];
    dadosServico:             DadosServico[];
}

export interface DadosCLiente {
    cliente:    string;
    cd_cliente: number;
    contato:    string;
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
