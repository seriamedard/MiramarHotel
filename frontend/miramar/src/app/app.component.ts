import { Component, OnInit } from '@angular/core';

import { MainstartService } from './services/mainstart.service';
import { Subscription } from 'rxjs-compat/Subscription';
import { RoomService } from './services/room.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'miramar';
  roomSubscription = Subscription.EMPTY;
  constructor(private startService: MainstartService,
              private roomService: RoomService,
              private toastr: ToastrService) {

  }
  ngOnInit() {
    this.startService.onStarted();
      
  }

  
}
