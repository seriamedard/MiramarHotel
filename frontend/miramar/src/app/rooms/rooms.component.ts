import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoryService } from '../services/category.service';
import { MainstartService } from '../services/mainstart.service';
import { RoomService } from '../services/room.service';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms: any[];
  name: "";
  categories: any[];
  loading : boolean;
  p:number = 1;
  constructor(private title: Title,
              private startService: MainstartService,
              private roomService: RoomService,
              private catService: CategoryService) {
    this.title.setTitle("Miramar - Chambres")
   }

  ngOnInit(): void {
    this.loading = true;
    this.startService.onStarted();
    this.getAllRooms();
    this.getCategories();
  }

  getAllRooms() {
    this.roomService.getAllRooms()
      .then(res => {
        this.rooms = res;
        this.loading = false;
      })
  }

  getCategories() {
    this.catService.getListCategory()
      .then(res => {
        this.categories = res;
      }).catch(err => {})
  }
}
