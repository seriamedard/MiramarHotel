import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { MainstartService } from '../services/mainstart.service';
import { ReloadService } from '../services/reload.service';
import { RoomService } from '../services/room.service';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {

  roomSubscription : Subscription;
  categorySubscription: Subscription;
  rooms: any[];
  name: "";
  categories: any[];
  loading : boolean;
  p:number = 1;
  constructor(private title: Title,
              private startService: MainstartService,
              private roomService: RoomService,
              private catService: CategoryService,
              private reloadService: ReloadService) {
    this.title.setTitle("Miramar - Chambres")
   }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => this.reloadService.reload(),50)
    this.startService.onStarted();
    this.getAllRooms();
    this.getCategories();
  }

  getAllRooms() {
    this.roomSubscription = this.roomService.roomSubject
        .subscribe(res => {
          this.rooms = res;
        },(err)=> {
          console.log(err)
        })
    this.roomService.emitNextRoomSubject();
  }

  getCategories() {
    this.categorySubscription = this.catService.categorySubject
      .subscribe(res => {
        this.categories = res;
      },(err) => {})
    this.catService.emitNextSubjet();
  }

  ngOnDestroy() {
    this.roomSubscription.unsubscribe()
    this.categorySubscription.unsubscribe();
  }
}
