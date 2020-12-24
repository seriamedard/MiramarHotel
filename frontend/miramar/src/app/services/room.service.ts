import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


const host =  environment.host;

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomSubject = new Subject<any[]>();
  private rooms: any[];

  constructor(private httpClient: HttpClient) { }

  emitRoomSubject( ) {
    this.roomSubject.next(this.rooms.slice())
  }

  getAllRooms(): Promise<any[]>{
    return new Promise((resolve, reject) => {
      this.httpClient.get<any[]>(host + '/rooms/')
        .subscribe(
          (res) => {
            resolve(res)
          },(err) => {
            reject(err)
          }
        )
    })
  }

  getRoomDetail(id: number) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(host +'/rooms/' +id)
          .subscribe(
            res => resolve(res),
            err => reject(err)
          )
    })

  
    
  }



}
