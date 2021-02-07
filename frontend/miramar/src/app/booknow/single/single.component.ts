import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/services/booking.service';
import { ClientService } from 'src/app/services/client.service';
import { RoomService } from 'src/app/services/room.service';
import { environment } from 'src/environments/environment';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { CategoryService } from 'src/app/services/category.service';
import { map } from 'rxjs-compat/operator/map';
import { tap } from 'rxjs/operators';
import { data } from 'jquery';
import { MainstartService } from 'src/app/services/mainstart.service';
import { ReloadService } from 'src/app/services/reload.service';
import { Subscription } from 'rxjs';

const host = environment.host;
declare var $:any;

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit, OnDestroy {

  myPhone = "phone"
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Chad, CountryISO.Senegal];
  CountryCode: string;

  clients: any[];
  client$ : Subscription;
  errorMessage :any;
  room: any = {};
  room$: Subscription;
  roomPromo: any;
  categories: any;
  category$: Subscription;
  isLoad = false;
  isLoad$: Subscription;
  constructor(private clientService: ClientService,
              private bookingService: BookingService,
              private roomService: RoomService,
              private catService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private toast: ToastrService,
              private startService: MainstartService,
              private reloadService: ReloadService) { }

  ngOnInit(): void {
    this.roomService.getAllRooms();
    this.catService.getListCategory();
    this.geoIp();

    this.isLoad$ = this.bookingService.isLoadSub
        .subscribe(res => this.isLoad = res)

    this.client$ = this.clientService.ClientSubject
      .subscribe(res => {
        this.clients = res
      })

    setTimeout(() => {
      this.reloadService.reload()
      this.startService.onStarted();
    },100)


    var id;
    id=parseInt(this.route.snapshot.params['id'],10)
    
    this.roomService.getRoomDetail(+id)
      .then(res => {
        this.room=res
      }).catch(err=> {})

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
        this.errorMessage = res;
      }
    );
  }

  ngOnDestroy() {
    this.category$.unsubscribe();
    this.client$.unsubscribe();
    this.isLoad$.unsubscribe();
  }

}
