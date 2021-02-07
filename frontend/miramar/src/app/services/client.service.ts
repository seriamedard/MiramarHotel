import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


var host = environment.host

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  ClientSubject = new Subject<any[]>();
  clients: any[] = [] 

  constructor(private httpClient: HttpClient) { 

  }

  emitNextClient() {
    this.ClientSubject.next(this.clients)
  }
  getAllClient() {
    this.httpClient.get(host +'/clients/')
      .subscribe((res:any) => {
        this.clients =  res;
        this.emitNextClient();
      }, err => {})
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

  getOnClient(id:number) {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.get(host + '/clients/' + id + '/')
        .subscribe(res => resolve(res),err => reject(err))
    })
    
  }
}
