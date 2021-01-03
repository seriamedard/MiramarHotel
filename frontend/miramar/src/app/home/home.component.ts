import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { MainstartService } from '../services/mainstart.service';
import { ReloadService } from '../services/reload.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  roomPromo:any;
  rooms: any[];
  categories: any[];
  room$: Subscription
  category$ : Subscription;
  constructor(private startService: MainstartService,
              private title: Title,
              private roomService: RoomService,
              private catService: CategoryService,
              private reloadService: ReloadService) {
      
    this.title.setTitle("Miramar - Accueil")
        
  this.reloadService.reload();
  }

  ngOnInit(): void {
    
    this.roomService.getAllRooms();
    this.catService.getListCategory();
    setTimeout(() => this.reloadService.reload(),100)
    this.startService.onStarted();
    this.roomService.getRoomPromo()
      .then(res => {
        this.roomPromo = res;
      }).catch(err => {})

    this.getFilterRooms(2).then(
      res => {
        this.rooms=res
      });

    this.category$ = this.catService.categorySubject
      .subscribe(res => {
        this.categories = res;
      })
  }

  getFilterRooms(max:number) {
    return new Promise<any>((resolve, reject) => {
      this.room$ = this.roomService.roomSubject
      .subscribe(
        res => {
          resolve(res.slice(0,max));
        }
      )
      
    })
    
    
  }

  ngOnDestroy() {
    this.room$.unsubscribe();
    this.category$.unsubscribe();
  }


}
