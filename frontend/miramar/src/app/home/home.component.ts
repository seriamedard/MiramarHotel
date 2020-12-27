import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainstartService } from '../services/mainstart.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  roomPromo:any;
  rooms: any[];
  constructor(private startService: MainstartService,
              private title: Title,
              private roomService: RoomService) {
      
    this.title.setTitle("Miramar - Accueil")
        

    }

  ngOnInit(): void {
    this.startService.onStarted();
    this.roomService.getRoomPromo()
      .then(res => {
        this.roomPromo = res;
      })

    this.getFilterRooms(2).then(
      res => {
        this.rooms=res
      });
  }

  getFilterRooms(max:number) {
    return new Promise<any>((resolve, reject) => {
      this.roomService.getAllRooms()
        .then(
          res => {
           resolve(res.slice(0,max));
      }
    )
    })
    
  }


}
