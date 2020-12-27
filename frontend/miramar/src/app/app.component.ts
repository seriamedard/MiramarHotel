import { Component, OnInit } from '@angular/core';

import { MainstartService } from './services/mainstart.service';
import { RoomService } from './services/room.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'miramar';
  constructor(private startService: MainstartService,
              private roomService: RoomService,
              private toastr: ToastrService) {

    this.startService.onStarted();
  }
  
  ngOnInit() {
    // this.startService.onStarted();
  }

  
}
