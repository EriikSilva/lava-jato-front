import { TestBed } from '@angular/core/testing';

import { CarrosService } from './carros.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment.development';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { deleteClientCarDTO, editClientCarDTO, getCarByClientDTO, postCarClientDTO } from './DTO/carrosDTO';

describe('CarrosService', () => {
  let service: CarrosService;
  let http: HttpClient


  const apiUrl = environment.apiUrl

  it('Chamar Get', () => {
    const dummyDataGet:getCarByClientDTO = {
      cd_cliente: 1
    }

    const spy = spyOn(http, 'get').and.callThrough()
    service.getCarByClient(dummyDataGet);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/veiculo/cliente/${dummyDataGet}`);
  })

  it('Chamar Post', () => {
    const dummyDataPost: postCarClientDTO = {
      cd_cliente:      1,
      placa:           '123456',
      modelo:          'SIENA',
      cd_tipo_veiculo: '1'
    }

    const spy = spyOn(http, 'post').and.callThrough()
    service.postClientCar(dummyDataPost);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/veiculo/cliente`, dummyDataPost);
  })

  it('Chamar Put', () => {
    const dummyDataPut: editClientCarDTO = {
      cd_cliente:      1,
      placa:           '123456',
      modelo:          'SIENA',
      cd_tipo_veiculo: '1',
      cd_veiculo:      1
    }

    const spy = spyOn(http, 'put').and.callThrough()
    service.editClientCar(dummyDataPut);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/veiculo/cliente`, dummyDataPut);
  })

  it('Chamar Delete', () => {
    const dummyDataDelete: deleteClientCarDTO = {
      cd_veiculo:      1,
    }

    const spy = spyOn(http, 'delete').and.callThrough()
    service.deleteClientCar(dummyDataDelete);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/veiculo/cliente/${dummyDataDelete}`);
  })

  it('Chamar Get Tipo Carro', () => {
    const spy = spyOn(http, 'get').and.callThrough()
    service.getTypeCar();
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/veiculo/tipo`);
  })






  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CarrosService);
    http    = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
