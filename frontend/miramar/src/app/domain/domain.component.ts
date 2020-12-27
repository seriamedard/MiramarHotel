import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { MainstartService } from '../services/mainstart.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
  faCoffee = faCoffee;
  constructor(private startService: MainstartService) { }

  ngOnInit(): void {

  }

}
