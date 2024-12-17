import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { finalize, tap, timeout } from 'rxjs/operators';
import { LoaderService } from './loader.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private defaultTimeout = 120000;

  baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient, private loaderService:LoaderService) { }

  post(url: string, data: any, p0?: { headers: HttpHeaders; responseType: string; }): Observable<any> {
    return this.http.post(`${this.baseUrl}${url}`, data);
  }

  put(url: string, data: any, p0?: { headers: HttpHeaders; responseType: string; }): Observable<any> {
    return this.http.put(`${this.baseUrl}${url}`, data);
  }

  get(url: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}${url}`)
  } 

  login(credentials: any): Observable<any> {
    this.loaderService.startLoading();
    return this.http.post(this.baseUrl + 'auth/login', credentials).pipe(
      timeout(this.defaultTimeout),
      finalize(() => {
        this.loaderService.stopLoading();
      })
    );
  }

  public refreshAccessToken(refreshToken: any) {
    this.loaderService.startLoading();
    const header = new HttpHeaders({
      'token': refreshToken
    });
    return this.http.get(this.baseUrl + 'auth/refresh', {
      headers: header,
      responseType: 'text'
    }).pipe(
      timeout(this.defaultTimeout),
      finalize(() => {
        this.loaderService.stopLoading();
      })
    );
  }

  checkId(invitationToken: any): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(`${this.baseUrl}auth/check/${invitationToken}`)
      .pipe(map(response => response.exists));
  }

  checkId_1(invitationToken: any): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(`${this.baseUrl}auth/check_forget_token/${invitationToken}`)
      .pipe(map(response => response.exists));
  }

}
