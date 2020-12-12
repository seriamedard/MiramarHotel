import { Component, OnInit } from '@angular/core';
import { MainstartService } from '../services/mainstart.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private startService: MainstartService) { }

  ngOnInit(): void {
    this.startService.onStarted();
  }

}
