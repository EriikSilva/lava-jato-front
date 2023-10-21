export const json_servico = (servico:any, nr_atendimento:number) => {    


    const dadosFiltrados = servico.filter((item:any) => item.nr_atendimento === nr_atendimento);
    return dadosFiltrados

    
}
