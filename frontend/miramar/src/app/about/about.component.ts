import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainstartService } from '../services/mainstart.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private startService: MainstartService,
              private title: Title) {
    this.title.setTitle("Miramar - Apropos-de-nous")
  }

  ngOnInit(): void {
    this.startService.onStarted();
  }

}
