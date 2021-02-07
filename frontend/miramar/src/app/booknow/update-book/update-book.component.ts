import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { ClientService } from 'src/app/services/client.service';
import { MainstartService } from 'src/app/services/mainstart.service';
import { ReloadService } from 'src/app/services/reload.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit, OnDestroy {
  bookGroup: FormGroup
  errorMessage: any;
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
  isLoad = false;
  isLoad$: Subscription;
  bookingUpdate: any = {};
  bookingUpdate$: Subscription;

  constructor(private reloadService: ReloadService,
              private formBuilder: FormBuilder,
              private bookingService: BookingService,
              private clientService : ClientService,
              private roomService: RoomService,
              private mainStart: MainstartService) { }

  ngOnInit(): void {
    this.reloadService.reload();
    this.mainStart.onStarted();
    this.room$ = this.roomService.roomSubject
          .subscribe(rooms => {
            this.rooms = rooms
          })

    this.bookGroup = this.formBuilder.group({
      arrival_date_hour: [Validators.required],
      departure_date_hour: [Validators.required],
      room: [Validators.required],
      guests: [Validators.required],
      name: [Validators.required],
      email: [Validators.email, Validators.required],
      phone: [Validators.required],
      note: [null]
    })
    this.bookingService.getOneBooking(93)
      .subscribe((book:any) => {
        console.log(book)
        this.bookGroup.get('arrival_date_hour').setValue(book.arrival_date_hour);
        this.bookGroup.get('departure_date_hour').setValue(book.departure_date_hour);
        var rm, idr;
        rm = /rooms\/(\d+)/.exec(book.chambre[0])
        if (rm) {
          idr = rm[1]
          this.bookGroup.get('room').setValue(idr); 
          
        }
        this.bookGroup.get('note').setValue(book.note);
        this.bookGroup.get('guests').setValue(book.guests);
        var m, id;
        m = /clients\/(\d+)/.exec(""+book.client+"")
        if (m) {
          id = m[1]
          this.clientService.getOnClient(id)
            .then((client:any) => {
              this.bookGroup.get('email').setValue(client.email);
              this.bookGroup.get('name').setValue(client.name);
              this.bookGroup.get('phone').setValue(client.phone);
            })
        }
      })

    this.roomService.getRoomPromo()
      .then(res => this.roomPromo = res)

  }

  ngOnDestroy() {
    this.room$.unsubscribe();
  }

}
