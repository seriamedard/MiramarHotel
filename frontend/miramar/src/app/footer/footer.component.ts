import { Component, OnInit } from '@angular/core';
import { MainstartService } from '../services/mainstart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  datenow: any;
  constructor(private startService: MainstartService) { }

  ngOnInit(): void {
    this.datenow = new Date().getFullYear()
  }

}
