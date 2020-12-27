import { Component, OnInit } from '@angular/core';
import { MainstartService } from '../services/mainstart.service';

@Component({
  selector: 'app-avisclient',
  templateUrl: './avisclient.component.html',
  styleUrls: ['./avisclient.component.scss']
})
export class AvisclientComponent implements OnInit {

  constructor(private startService: MainstartService) { }

  ngOnInit(): void {
  }

}
