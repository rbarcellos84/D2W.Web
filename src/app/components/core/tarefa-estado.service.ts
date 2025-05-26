import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../config/api-config.service'; 

@Injectable({
  providedIn: 'root'
})
export class TarefaEstadoService {
  apiUrl: string = '';

  constructor(private httpClient: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getApiBaseUrl();
  }

  listarStatusTarefa(): Observable<{ codigo: number, descricao: string }[]> {
    return this.httpClient.get<{ codigo: number, descricao: string }[]>(`${this.apiUrl}Tarefa/ListarStatus`);
  }
}
