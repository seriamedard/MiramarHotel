import { Component, OnInit } from '@angular/core';
import { MainstartService } from '../services/mainstart.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private startService: MainstartService) { }

  ngOnInit(): void {
    this.startService.onStarted();
  }

}
