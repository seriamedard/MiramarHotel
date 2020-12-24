import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const host = environment.host

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getListCategory() {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.get(host +'/category')
        .subscribe(res => resolve(res), err => reject(err))
    })
  }
}
