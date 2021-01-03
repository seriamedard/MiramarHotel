import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainstartService } from '../services/mainstart.service';
import { ReloadService } from '../services/reload.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private startService: MainstartService,
              private title: Title,
              private reloadService: ReloadService) {
    this.title.setTitle("Miramar - Apropos-de-nous")
  }

  ngOnInit(): void {
    setTimeout(() => this.reloadService.reload(),100)
    this.startService.onStarted()
  }

}
