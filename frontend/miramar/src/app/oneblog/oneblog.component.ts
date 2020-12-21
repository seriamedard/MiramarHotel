import { Component, OnInit } from '@angular/core';
import { MainstartService } from '../services/mainstart.service';

@Component({
  selector: 'app-oneblog',
  templateUrl: './oneblog.component.html',
  styleUrls: ['./oneblog.component.scss']
})
export class OneblogComponent implements OnInit {

  constructor(private startService: MainstartService) { }

  ngOnInit(): void {
    this.startService.onStarted();
  }

}
