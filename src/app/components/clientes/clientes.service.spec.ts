import { ClientRegisterDTO } from './DTO/clientesDTO';
import { TestBed } from '@angular/core/testing';

import { ClientesService } from './clientes.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

fdescribe('ClientesService', () => {
  let service: ClientesService;
  let http: HttpClient

  const apiUrl = environment.apiUrl

  const httpSub = {
    get: () => of( {
      "cd_cliente": 27,
      "nm_cliente": "teste de validation",
      "cpf_cnpj": "12312038129038",
      "dt_cadastro": "2023-10-05T13:53:33.000Z",
      "dt_update": "2023-10-05T13:53:33.000Z",
      "cep": "69074815",
      "bairro": "teste",
      "nr_casa": "10",
      "cd_usuario": null,
      "status": "A",
      "telefone1": "27317391827",
      "telefone2": "17239081273",
      "veiculos_clientes": []
  })
  }

  it('Chamar Get', () => {
    const spy = spyOn(http, 'get').and.callThrough()
    service.getClients();
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/cliente`);
  })

  it('Chamar Post', () => {
    const dummyClientPost = {
      nm_cliente: 'Erik Felipe',
      cpf_cnpj:   '00000000000',     
      cep:        '00000000',       
      bairro:     'Bairro Teste',
      nr_casa:    '10',       
      telefone1:  '9999999999' ,      
      telefone2:  '9999999999'       
    }
    const spy = spyOn(http, 'post').and.callThrough()
    service.postClients(dummyClientPost);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/cliente`, dummyClientPost);
  })


  it('Chamar Put', () => {
    const dummyClientPut = {
      nm_cliente: 'Erik Felipe',
      cpf_cnpj:   '00000000000',     
      cep:        '00000000',       
      bairro:     'Bairro Teste',
      nr_casa:    '10',       
      telefone1:  '9999999999' ,      
      telefone2:  '9999999999',
      status:     "I",
      cd_cliente: 2
    }
    const spy = spyOn(http, 'put').and.callThrough()
    service.editClient(dummyClientPut);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/cliente`, dummyClientPut);
  })

  it('Chamar Delete', () => {
    const dummyClientDelete = {
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
