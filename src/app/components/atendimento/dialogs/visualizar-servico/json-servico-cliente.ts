export const json_servico = (servico:any, nr_atendimento:number) => {    


    const dadosFiltrados = servico.filter((item:any) => item.nr_atendimento === nr_atendimento);
    // const servicosMapeados = servico.map((atendimento:any) => 
    // atendimento.dadosAtendimento.dadosServico.map((servico:any) => ({
    //     nr_atendimento:atendimento.dadosAtendimento.nr_atendimento,
    //     cd_servico: servico.cd_servico,
    //     servico: servico.servico,
    //     tipo_veiculo: servico.tipo_veiculo,
    //     status_servico:servico.status_servico,
    //     placa: servico.placa,
    //     modelo_veiculo: servico.modelo_veiculo,
    //     valor: servico.valor,
    //     nr_servico:servico.nr_servico_atendimento
    // })));

    // const filteredServicos = servicosMapeados.filter((servicos:any) =>
    //     servicos.some((servico:any) => servico.nr_atendimento === nr_atendimento)
    // );
    
    // return filteredServicos[0]
    return dadosFiltrados

    
}
