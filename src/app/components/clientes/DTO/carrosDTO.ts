export interface postCarClientDTO {
    cd_cliente:      number;
    placa:           string;
    modelo:          string;
    cd_tipo_veiculo: string;
}

export interface deleteClientCarDTO{
    cd_veiculo: number
}

export interface GetTypeCarDTO {
    cd_tipo_veiculo: number;
    descricao:       string;
}
