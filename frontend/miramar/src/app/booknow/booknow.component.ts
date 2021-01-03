import { Component, OnDestroy, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { MainstartService } from '../services/mainstart.service';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { RoomService } from '../services/room.service';
import { BookingService } from '../services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ReloadService } from '../services/reload.service';
import { Subscription } from 'rxjs';

const host = environment.host;
declare var $:any;
@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.scss']
})
export class BooknowComponent implements OnInit, OnDestroy {

  myPhone = "phone"
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  CountryCode: string;
  preferredCountries: CountryISO[] = [CountryISO.Chad, CountryISO.Senegal];

  room$ : Subscription;
  category$: Subscription;
  client$: Subscription;
  clients : any[] = [];
  rooms: any[] = [];
  categories: any;
  roomPromo: any;
  errorMessage : any;
  isLoad = false;
  isLoad$: Subscription;

  constructor(private startService: MainstartService,
              private title: Title,
              private clientService: ClientService,
              private roomService: RoomService,
              private bookingService: BookingService,
              private catService: CategoryService,
              private toast : ToastrService,
              private router: Router,
              private reloadService: ReloadService) {
                
      this.title.setTitle("Miramar Hotel Reservation"); 

    }

  ngOnInit(): void {
    this.roomService.getAllRooms(); // Load All Rooms
    this.catService.getListCategory(); // Load All Categories
    this.clientService.getAllClient(); // Load all clients

    this.isLoad$ = this.bookingService.isLoadSub
        .subscribe(res => {
          this.isLoad = res
        })

    this.client$ = this.clientService.ClientSubject
      .subscribe(res => {        
        this.clients = res
      })

    setTimeout(() => this.reloadService.reload(),100)

    this.geoIp();

    this.room$ = this.roomService.roomSubject
      .subscribe(res => {
        this.rooms = res
      })

    this.roomService.getRoomPromo()
      .then(res => this.roomPromo=res)

    this.getCategories();

  }

  async geoIp(){
    this.reloadService.getIpInfo().subscribe(
      (resp:any) => {
        var countryCode = (resp && resp.country) ? resp.country : "us";
        this.CountryCode = countryCode
      }
    )

  }

  
  getCategories() {
   this.category$ = this.catService.categorySubject
    .subscribe(res => {
      this.categories = res;
    })
  }
  
  onSubmitBook(form: NgForm) {
    this.isLoad = this.bookingService.isLoad
    this.bookingService.submitBook(form).then(
      res => {
        this.errorMessage = res
      }
    );
  }

  ngOnDestroy() {
    this.client$.unsubscribe();
    // this.room$.unsubscribe();
    this.category$.unsubscribe();
    this.isLoad$.unsubscribe();
  }
  

}
