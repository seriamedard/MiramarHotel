import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ReloadService {

  constructor(private httpClient: HttpClient) { }

  reload() {
    var contentWayPoint = function() {
      var i = 0;
      $('.element-animate').waypoint( function( direction ) {
  
        if( direction === 'down' && !$(this).hasClass('element-animated') ) {
          
          i++;
  
          $(this).addClass('item-animate');
          setTimeout(function(){
  
            $('body .element-animate.item-animate').each(function(k){
              var el = $(this);
              setTimeout( function () {
                var effect = el.data('animate-effect');
                if ( effect === 'fadeIn') {
                  el.addClass('fadeIn element-animated');
                } else if ( effect === 'fadeInLeft') {
                  el.addClass('fadeInLeft element-animated');
                } else if ( effect === 'fadeInRight') {
                  el.addClass('fadeInRight element-animated');
                } else {
                  el.addClass('fadeInUp element-animated');
                }
                el.removeClass('item-animate');
              },  k * 100);
            });
            
          }, 100);
          
        }
  
      } , { offset: '95%' } );
    };
    contentWayPoint();
  }

  /**
   * get info about ip user
   */
  getIpInfo() {
    return this.httpClient.get("https://ipinfo.io?token=ipinfo.io")
  }
}
