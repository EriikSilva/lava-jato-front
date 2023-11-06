export interface PostServico {
    desc_servico: string;
    vlr_servico:  number;
}

export interface PutServico {
    cd_servico:   number;
    desc_servico: string;
    vlr_servico:  number;
}

export interface PostTipoPagamento {
    descricao:    string;
    qtd_parcelas: number;
}
