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

export interface PutTipoPagamento {
    cd_pagamento:      number;
    descricao:         string;
    qtd_parcelas:      number;
}

export interface DeleteTipoPagamento{
    cd_pagamento:      number;
}


export interface PostVeiculo{
    descricao: string;
}

export interface PutVeiculo{
    cd_tipo_veiculo: number;
    descricao: string;
}
