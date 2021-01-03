import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainstartService } from '../services/mainstart.service';
import { ReloadService } from '../services/reload.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private startService: MainstartService,
              private titlte: Title,
              private reloadService: ReloadService) {
      this.titlte.setTitle("Miramar - Contact")
    }

  ngOnInit(): void {
    this.startService.onStarted();
    setTimeout(() => this.reloadService.reload(),100)
  }

}
