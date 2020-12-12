import { Component, OnInit } from '@angular/core';
import { MainstartService } from '../services/mainstart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private startService: MainstartService) { }

  ngOnInit(): void {
    this.startService.onStarted();
  }


}
