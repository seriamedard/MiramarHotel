import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


const host =  environment.host;

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomSubject = new Subject<any[]>();
  rooms: any[] = [];
  isLoad: boolean = false;
  isLoadSubject = new Subject<boolean>();
  constructor(private httpClient: HttpClient) {
    this.getAllRooms();
   }

  emitNextRoomSubject( ) {
    this.roomSubject.next(this.rooms);
  }

  emitLoading() {
    this.isLoadSubject.next(this.isLoad);
  }


  getAllRooms(){
      const req = new HttpRequest(
        "GET", host + '/rooms/',{reportProgress:true}
      )
      this.httpClient.request(req)
        .subscribe((res:any) => {
          if(res.type == 1) {
            this.isLoad = true
            this.emitLoading()
          }else if(res.type == 4) {
            this.isLoad = false;
            this.rooms = res.body;
            this.emitLoading();
            this.emitNextRoomSubject();       
          }
        }
        ,(err) => {
            
          }
        )
      
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

  getRoomPromo() {
      var roomFilter;
      function getRandomInt(max) {
        return Math.floor(Math.random()*Math.floor(max))
      }  
      return new Promise<any>((resolve, reject) => {     
          var aleanum : number;
          this.roomSubject.subscribe(
            res => {
                roomFilter = res.filter( el => el.promo == true)
                try {
                  aleanum = getRandomInt(roomFilter.length);
                  resolve(roomFilter[aleanum])
                } catch (error) {
                }
              }
            )

        })
      
  }


}

