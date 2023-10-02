export interface ClientRegisterDTO {
    nm_cliente: string;
    cpf_cnpj:   string;
    cep:        string;
    bairro:     string;
    nr_casa:    string;
    telefone1:  string;
    telefone2:  string;
}

export interface ClientEditDTO {
    cd_cliente: number;
    status:     string;
    nm_cliente: string;
    cpf_cnpj:   string;
    cep:        string;
    bairro:     string;
    nr_casa:    string;
}

export interface ClienteDeleteDTO{
    cd_cliente: number;
}
export interface ClienteEditDTO {
    cd_cliente: number;
    nm_cliente: string;
    cpf_cnpj:   string;
    cep:        string;
    bairro:     string;
    nr_casa:    string;
    status:     string;
}
export interface ClienteGetDTO {
    cd_cliente:        number;
    nm_cliente:        string;
    cpf_cnpj:          string;
    dt_cadastro:       string;
    dt_update:         string;
    cep:               string;
    bairro:            string;
    nr_casa:           string;
    cd_usuario:        null;
    status:            string;
    veiculos_clientes: VeiculosCliente[];
}

export interface VeiculosCliente {
    placa:  string;
    modelo: string;
}
