import { Component, OnInit } from '@angular/core';
import { MainstartService } from './services/mainstart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'miramar';
  constructor(private startService: MainstartService) {

  }
  ngOnInit() {
    this.startService.onStarted();
  }

  
}
