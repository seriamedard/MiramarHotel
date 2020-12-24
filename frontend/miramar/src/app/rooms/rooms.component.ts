import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../services/category.service';
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

  constructor(private title: Title,
              private roomService: RoomService,
              private catService: CategoryService) {
    this.title.setTitle("Miramar - Chambres")
   }

  ngOnInit(): void {
    this.loading = true;
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
        console.log(res)
        this.categories = res;
      }).catch(err => console.log(err))
  }
}
