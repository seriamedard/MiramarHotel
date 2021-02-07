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
  bookingUpdate: any;
  bookingUpdateSub= new Subject<any>();

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
  emitBookingUpdate() {
    this.bookingUpdateSub.next(this.bookingUpdate);
  }

  getOneBooking(id:number) {
    return this.httpClient.get(host + '/reservation/' + id + '/')
  }

  getAllBooking() {
    return this.httpClient.get(host + '/reservation/')
  }

  /**
   * 
   * @param id : number "id of client"
   * @returns booking_set: any[] un tableau des reserves d'un client
   */
  filterBookingByClient(id:number) : Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      var booking_set: any[];
      this.getAllBooking().subscribe(
        (res : any[]) => {
          booking_set = res.filter(el => el.client === id);
          resolve(booking_set);
        }
      )
    })
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
      }, err => {
        reject(err)
      })
    }) 
  }

  /**
   * 
   * @param data : Object of booking
   * @param client : curent client
   */
  saveBooking(data:any,client:any) {
    return new Promise((resolve, reject) => {
      data.client = client.id
    this.filterBookingByClient(client.id)
      .then(res => {
        var bookings = res;
        var idbooking: number;
        var continued = true
        if (bookings) {
          for(var i=0; i< bookings.length; i++) {
            if(Date.parse(bookings[i].arrival_date_hour) == Date.parse(data.arrival_date_hour) || (Date.parse(bookings[i].departure_date_hour) === Date.parse(data.departure_date_hour))) {
              idbooking = bookings[i].id
              continued=false;
              break
            }
          }
          if(idbooking) {
            this.getOneBooking(idbooking).subscribe(
              res => {
                this.bookingUpdate=res
                this.emitBookingUpdate()
              },
              err => {
                console.log(err)
              });
    
            (<any>$('#exampleModal')).modal({
            })
            $('#exampleModal').on('show.bs.modal', function(e) {
              var modal = (<any>$(this))
              
            })
          }
    
        }
        
        if (continued || bookings.length === 0) {
          this.createNewBooking(data)
            .then(res => {
              this.router.navigate([""])
              this.toast.success("La reservation est bien réçu !","Confirmation", {closeButton: true, timeOut: 10000});
              setTimeout(() =>{
                this.toast.info("Un email ou sms de confirmation vous a été envoyé, Merci !","Notification",{closeButton: true, timeOut: 10000});
              },2000)
              resolve(res)
              
            }).catch(err => {
              this.toast.error("Une erreur est survenue, veuillez faire une nouvelle reservation !", "Erreur", {closeButton: true, timeOut: 4000})
              reject(err)
            })
          }
        })
      })
  }

  /**
   * 
   * @param id : id of book
   * @param data : others data of book
   */
  updateBooking(id:number,data:any) {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.put(host + '/reservation/'+ id +'/', data)
          .subscribe(res => resolve(res), err => reject(err))
    })
  }

  /**
   * 
   * @param form : NgFom: 
   * @function : treat a form and returns notif
   */
  submitBook(form: NgForm) {
    return new Promise((resolve, reject) => {
        this.isLoad = false;
        this.emitLoading();
        var arrival_date_hour:any = $('#arrival_date input').val();
        arrival_date_hour = arrival_date_hour ? new Date(arrival_date_hour) : null;
        var departure_date_hour:any = $('#departure_date input').val();   
        departure_date_hour = departure_date_hour ? new Date(departure_date_hour) : null;
        const note = form.value['note'];
        const guests = parseInt(form.value['guests'],10);
        const name = form.value['name'];
        const phone = form.value['phone'].internationalNumber;
        const email = form.value['email'];
        const idchambre =parseInt(form.value['chambre'],10);      
      if (Date.parse(arrival_date_hour) >= Date.parse(departure_date_hour)) {
        this.errorMessage = $.extend({}, this.errorMessage,{arrival_date_hour: "La date d'arrivée ne peut pas depasser la date de départ"});
        resolve(this.errorMessage)
        this.isLoad = false;
        this.emitLoading();
      }else {
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

        if (this.clients) {
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
                    this.saveBooking(booking, client)
                      .catch(err => {
                        this.errorMessage = $.extend({}, this.errorMessage, err.error);
                        resolve(this.errorMessage)
                        this.isLoad = false;
                        this.emitLoading();
                      });  
                  }).catch(err => {
                    this.errorMessage = $.extend({}, this.errorMessage, err.error);
                    resolve(this.errorMessage)
                    this.isLoad = false;
                    this.emitLoading();
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
                this.saveBooking(booking, client)
                    .catch(err => {
                      console.log(err)
                      this.errorMessage = $.extend({}, this.errorMessage, err.error);
                      resolve(this.errorMessage)
                      this.isLoad = false;
                      this.emitLoading();
                  }).then(res => console.log(res));
              }).catch(err => {
                console.log(err
                  )
                this.errorMessage = $.extend({}, this.errorMessage, err.error);
                resolve(this.errorMessage)
                this.isLoad = false;
                this.emitLoading();
              })
          }
        }else {
          client.name = name;
          client.email = email;
          client.phone = phone;
          this.clientService.createNewClient(client)
            .then(res => {
              client = res;
              this.saveBooking(booking, client)
                  .catch(err => {
                    this.errorMessage = $.extend({}, this.errorMessage, err.error);
                    resolve(this.errorMessage)
                    this.isLoad = false;
                    this.emitLoading();
                  });
            }).catch(err => {
              this.errorMessage = $.extend({}, this.errorMessage, err.error);
              resolve(this.errorMessage)
              this.isLoad = false;
              this.emitLoading();
            })
        }
      }
    })
  }
}
