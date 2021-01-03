import { Component, OnInit } from '@angular/core';
import { MainstartService } from '../services/mainstart.service';
import { ReloadService } from '../services/reload.service';

@Component({
  selector: 'app-oneblog',
  templateUrl: './oneblog.component.html',
  styleUrls: ['./oneblog.component.scss']
})
export class OneblogComponent implements OnInit {

  constructor(private startService: MainstartService,
              private reloadService: ReloadService) { }

  ngOnInit(): void {
    setTimeout(() => this.reloadService.reload(),100)
    this.startService.onStarted();
  }

}
