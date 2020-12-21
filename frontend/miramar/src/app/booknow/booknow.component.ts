import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainstartService } from '../services/mainstart.service';
@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.scss']
})
export class BooknowComponent implements OnInit {

  constructor(private startService: MainstartService,
              private title: Title) {
      this.title.setTitle("Miramar - Reservation")
    }

  ngOnInit(): void {
    this.startService.onStarted();
  }

}
