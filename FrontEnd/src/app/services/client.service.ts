import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { client, ClientType } from '../models/client.model';

export interface PaginatedResponse<T> {
  $id: string;
  Items: {
    $id: string;
    $values: T[];
  };
  Total: number;
  Page: number;
  PageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.endPoint}/client`
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Método para listar clientes com paginação
  listarClientes(page: number = 1, pageSize: number = 10, search: string = ''): Observable<PaginatedResponse<client>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      params = params.set('filter', search);
    }

    return this.http.get<PaginatedResponse<client>>(`${this.baseUrl}/listar`, { params })
      .pipe(
        tap(response => console.log('[ClientService] Resposta da API (listar clientes):', response))
      );
  }

  // Método para cadastrar um cliente
  create(client: client): Observable<client> {
    console.log('Enviando requisição de criação:', {
      url: `${this.baseUrl}/cadastrar`,
      client: client
    });
    return this.http.post<client>(`${this.baseUrl}/cadastrar`, client).pipe(
      tap(response => console.log('Resposta da criação:', response))
    );
  }

  // Método para atualizar um cliente
  update(id: string, client: client): Observable<client> {
    console.log('Enviando requisição de atualização:', {
      url: `${this.baseUrl}/editar`,
      id: id,
      client: client
    });
    return this.http.put<client>(`${this.baseUrl}/editar`, client);
  }

  // Método para excluir um cliente
  delete(id: string): Observable<void> {
    console.log('Enviando requisição de exclusão:', {
      url: `${this.baseUrl}/excluir/${id}`
    });
    return this.http.delete<void>(`${this.baseUrl}/excluir/${id}`, { headers: this.headers }).pipe(
      tap(() => console.log('Cliente excluído com sucesso'))
    );
  }

  // Método para visualizar um cliente
  visualizar(id: string): Observable<client> {
    return this.http.get<client>(`${this.baseUrl}/visualizar/${id}`);
  }
} 