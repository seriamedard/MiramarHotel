import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

const host = environment.host;

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  errorMessage: any;
  constructor(private httpClient: HttpClient,
              private toast: ToastrService,
              private router: Router) { }

  createNewBooking(newbooking: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(host + '/reservation/', newbooking)
      .subscribe(res => {
        resolve(res)
      }, err => reject(err))
    }) 
  }

  saveBooking(data:any,client:any) {
    data.client = host + '/clients/'+ client.id +'/'
    this.createNewBooking(data)
        .then(res => {
          data = res
          this.toast.success("La reservation est bien réçu !","Confirmation")
          this.router.navigate([""])
          this.toast.info("Un email ou sms de confirmation vous a été envoyé, Merci !")
        }).catch(err => {
          this.toast.error("Une erreur est survenue, veuillez faire une nouvelle reservation !")
          this.errorMessage = $.extend({}, this.errorMessage, err.error); 
        })
  }

}
