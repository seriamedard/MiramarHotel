import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainstartService } from '../services/mainstart.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private startService: MainstartService,
              private title: Title) {
    this.title.setTitle("Miramar - Evenements")
    }

  ngOnInit(): void {
  }

}
