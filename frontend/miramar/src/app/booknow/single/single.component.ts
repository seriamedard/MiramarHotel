import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
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

const host = environment.host;
declare var $:any;

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  myPhone = "phone"
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Chad, CountryISO.Senegal];

  clients: any[];
  errorMessage :any;
  room: any = {};
  roomPromo: any;
  categories: any;
  constructor(private clientService: ClientService,
              private bookingService: BookingService,
              private roomService: RoomService,
              private catService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private toast: ToastrService,
              private startService: MainstartService) { }

  ngOnInit(): void {
    this.startService.onStarted();
    var id;
    id=parseInt(this.route.snapshot.params['id'],10)
    
    this.roomService.getRoomDetail(+id)
      .then(res => {
        this.room=res
      }).catch(err=> console.log(err))
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
    const idchambre =this.room.id;
    var booking :any = {};
      booking.arrival_date_hour = arrival_date_hour;
      booking.departure_date_hour = departure_date_hour;
      booking.note = note;
      booking.guests = guests;
      booking.chambre = [host + '/rooms/' + idchambre + '/']

    var client: any;
    client = {};
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
                this.bookingService.saveBooking(booking,client);
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
          console.log(res)
          this.bookingService.saveBooking(booking, client);
        }).catch(err => {
          this.errorMessage = $.extend({}, this.errorMessage, err.error);
        })
    }

    // (async () => {
    //   var booking :any = {};
    //   booking.arrival_date_hour = arrival_date_hour;
    //   booking.departure_date_hour = departure_date_hour;
    //   booking.note = note;
    //   booking.guests = guests;
    //   booking.client =  await host + '/clients/'+ client.id +'/'
    //   booking.chambre = [host + '/rooms/' + idchambre + '/']
    //   this.bookingService.createNewBooking(booking)
    //     .then(res => {
    //       booking = res
    //       this.toast.success("La reservation est bien réçu !","Confirmation")
    //       this.router.navigate([""])
    //     }).catch(err => {
    //       this.toast.error("Une erreur est survenue, veuillez faire une nouvelle reservation !")
    //       this.errorMessage = $.extend({}, this.errorMessage, err.error);
          
    //     })

    // })();
  }

  

}
