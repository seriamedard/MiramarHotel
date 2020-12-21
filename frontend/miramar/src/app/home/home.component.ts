import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainstartService } from '../services/mainstart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private startService: MainstartService,
              private title: Title) {
      
    this.title.setTitle("Miramar - Accueil")
    }

  ngOnInit(): void {
    this.startService.onStarted();
  }


}
