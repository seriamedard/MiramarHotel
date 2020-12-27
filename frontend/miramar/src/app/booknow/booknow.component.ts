import { Component, OnInit} from '@angular/core';
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

const host = environment.host;
declare var $:any;
@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.scss']
})
export class BooknowComponent implements OnInit {

  myPhone = "phone"
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Chad, CountryISO.Senegal];

  clients : any[] = [];
  rooms: any[] = [];
  categories: any;
  roomPromo: any;
  errorMessage : any;

  constructor(private startService: MainstartService,
              private title: Title,
              private clientService: ClientService,
              private roomService: RoomService,
              private bookingService: BookingService,
              private catService: CategoryService,
              private toast : ToastrService,
              private router: Router) {
      this.title.setTitle("Miramar - Reservation"); 

    }

  ngOnInit(): void {
    this.clientService.getAllClient()
        .then((res:any) => {
          this.clients = res;
    });
    
    this.roomService.getAllRooms()
    .then(res => {
      this.rooms = res;
    });

    this.roomService.getRoomPromo()
      .then(res => this.roomPromo=res)
    this.getCategories();

  }

  
  getCategories() {
    this.catService.getListCategory()
      .then(res => {
        this.categories = res;
      }).catch(err => console.log(err))
  }
  
  onSubmitBook(form: NgForm) {

    const arrival_date_hour = form.value['arrival_date_hour'];
    const departure_date_hour = form.value['departure_date_hour']
    const note = form.value['note'];
    const guests = parseInt(form.value['guests'],10);
    const name = form.value['name'];
    const phone = form.value['phone'].internationalNumber;
    const email = form.value['email'];
    const idchambre =parseInt(form.value['chambre'],10);
    var client: any;
    client = {};
    var booking :any = {};
      booking.arrival_date_hour = arrival_date_hour;
      booking.departure_date_hour = departure_date_hour;
      booking.note = note;
      booking.guests = guests;
      booking.chambre = [host + '/rooms/' + idchambre + '/']
    // Filter by email
    var create= true;

    //reload clients
    this.clientService.getAllClient()
        .then((res:any) => {
          this.clients = res;
    });

    if (this.clients ) {
      this.clients.forEach(el => {
        if (el.email === email) {
          create = false;
          client = el;
          client = {
            ...el,
            name: name,
            phone : phone ? phone : el.phone,
          }

          // if exist just update
          this.clientService.updateClient(client.id,client)
              .then(res => {
                client = res
                this.bookingService.saveBooking(booking, client);
              }).catch(err => {
                this.errorMessage = $.extend({}, this.errorMessage, err.error);
                // console.log(this.errorMessage);
              })
        }
      })
        
      if ( create === true ) {
        client.name = name;
        client.email = email;
        client.phone = phone;
        this.clientService.createNewClient(client)
          .then(res => {
            client = res;
            this.bookingService.saveBooking(booking, client);
          }).catch(err => {
            this.errorMessage = $.extend({}, this.errorMessage, err.error);
          })
      }
    }else {
      client.name = name;
      client.email = email;
      client.phone = phone;
      this.clientService.createNewClient(client)
        .then(res => {
          client = res;
          this.bookingService.saveBooking(booking,client);
        }).catch(err => {
          this.errorMessage = $.extend({}, this.errorMessage, err.error);
        })
    }
  }

}
