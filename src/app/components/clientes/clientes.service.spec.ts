import { ClientEditDTO, ClientRegisterDTO, ClienteDeleteDTO } from './DTO/clientesDTO';
import { TestBed } from '@angular/core/testing';

import { ClientesService } from './clientes.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'environments/environment.prod';

describe('ClientesService', () => {
  let service: ClientesService;
  let http: HttpClient

  const apiUrl = environment.apiUrl

  it('Chamar Get', () => {
    const spy = spyOn(http, 'get').and.callThrough()
    service.getClients();
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/cliente`);
  })

  it('Chamar Post', () => {
    const dummyClientPost:ClientRegisterDTO = {
      nm_cliente: 'Erik Felipe',
      cpf_cnpj:   '00000000000',     
      cep:        '00000000',       
      bairro:     'Bairro Teste',
      nr_casa:    '10',       
      telefone1:  '9999999999' ,      
      telefone2:  '9999999999' ,
      rua:"Rua Teste",
      cd_usuario:1      
    }
    const spy = spyOn(http, 'post').and.callThrough()
    service.postClients(dummyClientPost);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/cliente`, dummyClientPost);
  })


  it('Chamar Put', () => {
    const dummyClientPut: ClientEditDTO= {
      nm_cliente: 'Erik Felipe',
      cpf_cnpj:   '00000000000',     
      cep:        '00000000',       
      bairro:     'Bairro Teste',
      nr_casa:    '10',       
      telefone1:  '9999999999' ,      
      telefone2:  '9999999999',
      status:     "I",
      rua:"Rua Teste",
      cd_cliente: 2
    }
    const spy = spyOn(http, 'put').and.callThrough()
    service.editClient(dummyClientPut);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/cliente`, dummyClientPut);
  })

  it('Chamar Delete', () => {
    const dummyClientDelete:ClienteDeleteDTO = {
      cd_cliente: 1
    }

    const spy = spyOn(http, 'delete').and.callThrough()
    service.deleteClient(dummyClientDelete)
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/cliente/${dummyClientDelete}`)
  })
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ClientesService);
    http    = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
