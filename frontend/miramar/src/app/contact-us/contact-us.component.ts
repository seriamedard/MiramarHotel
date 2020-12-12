import { Component, OnInit } from '@angular/core';
import { MainstartService } from '../services/mainstart.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private startService: MainstartService) { }

  ngOnInit(): void {
    this.startService.onStarted();
  }

}
