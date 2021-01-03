import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainstartService } from '../services/mainstart.service';
import { ReloadService } from '../services/reload.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private startService: MainstartService,
              private title: Title,
              private reloadService: ReloadService) {
    this.title.setTitle("Miramar - Evenements")
    }

  ngOnInit(): void {
    setTimeout(() => this.reloadService.reload(),100)
    this.startService.onStarted();
  }

}
