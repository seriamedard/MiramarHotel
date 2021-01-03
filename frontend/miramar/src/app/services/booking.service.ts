import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientService } from './client.service';

const host = environment.host;

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  errorMessage: any;
  clients : any[] = [];
  client$ : Subscription;
  rooms: any[] = [];
  isLoad = false;
  isLoadSub= new Subject<boolean>();

  constructor(private httpClient: HttpClient,
              private toast: ToastrService,
              private router: Router,
              private clientService: ClientService) {

    this.clientService.getAllClient()
    this.client$ = this.clientService.ClientSubject
                .subscribe(res => {
                  this.clients = res;
                })

  }

  emitLoading() {
    this.isLoadSub.next(this.isLoad);
  }

  /**
   * 
   * @param newbooking : any : new booking
   * @returns newbooking saved
   */
  createNewBooking(newbooking: any) {
    return new Promise((resolve, reject) => {
      // Prepare object request
      const req = new HttpRequest(
        "POST", host + '/reservation/',newbooking,{reportProgress:true}
      )

      //Call httpClient
      this.httpClient.request(req)
      .subscribe((res:any) => {
        if(res.type == 1) {
          this.isLoad = true
          this.emitLoading()
        }else if(res.type == 4) {
          this.isLoad = false;
          this.emitLoading();       
          resolve(res.body);
        }
      }, err => reject(err))
    }) 
  }

  /**
   * 
   * @param data : Object of booking
   * @param client : curent client
   */
  saveBooking(data:any,client:any) {
    data.client = host + '/clients/'+ client.id +'/'
    this.createNewBooking(data)
        .then(res => {
          // data = res
          this.router.navigate([""])
          this.toast.success("La reservation est bien réçu !","Confirmation")
          this.toast.info("Un email ou sms de confirmation vous a été envoyé, Merci !")
        }).catch(err => {
          this.toast.error("Une erreur est survenue, veuillez faire une nouvelle reservation !")
          this.errorMessage = $.extend({}, this.errorMessage, err.error); 
        })
  }

  /**
   * 
   * @param form : NgFom: 
   * @function : treat a form and returns notif
   */
  submitBook(form: NgForm) {
    return new Promise((resolve, reject) => {

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
                  this.saveBooking(booking, client);
                }).catch(err => {
                  this.errorMessage = $.extend({}, this.errorMessage, err.error);
                  resolve(this.errorMessage)
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
              this.saveBooking(booking, client);
            }).catch(err => {
              this.errorMessage = $.extend({}, this.errorMessage, err.error);
              resolve(this.errorMessage)
            })
        }
      }else {
        client.name = name;
        client.email = email;
        client.phone = phone;
        this.clientService.createNewClient(client)
          .then(res => {
            client = res;
            this.saveBooking(booking,client);
          }).catch(err => {
            this.errorMessage = $.extend({}, this.errorMessage, err.error);
            resolve(this.errorMessage)
          })
      }
    })
  }

}
