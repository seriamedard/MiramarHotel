import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


var host = environment.host

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { 

  }

  getAllClient() {
    return new Promise((resolve, reject) => {
      this.httpClient.get(host +'/clients/')
        .subscribe(res => resolve(res), err => reject(err))
    })
  }

  createNewClient(newclient:any) {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.post(host +'/clients/', newclient)
      .subscribe(res => resolve(res),err=> reject(err))
    })
  }

  updateClient(id:number, value:any) {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.put(host + '/clients/'+ id +'/', value)
          .subscribe(res => resolve(res), err => reject(err))
    })
  }
}
