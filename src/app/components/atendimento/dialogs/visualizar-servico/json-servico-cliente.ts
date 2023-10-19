export const json_servico = (servico:any) => {
    const servicosMapeados = servico.map((atendimento:any) => 
    atendimento.dadosAtendimento.dadosServico.map((servico:any) => ({
        cd_servico: servico.cd_servico,
        servico: servico.servico,
        tipo_veiculo: servico.tipo_veiculo,
        status_servico: servico.status_servico,
        placa: servico.placa,
        modelo_veiculo: servico.modelo_veiculo,
        valor: servico.valor,
    })));

    return servicosMapeados
}
