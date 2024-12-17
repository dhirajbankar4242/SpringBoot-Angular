
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  setTenantType(key: string, value: any){
    localStorage.setItem(key, value);
  }

  getTenantType(key:string){
    localStorage.getItem(key)
  }

  async clear() {
    await localStorage.clear();
  }
  
}
