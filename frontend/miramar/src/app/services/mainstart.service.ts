import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { intlTelInput } from 'intl-tel-input';
declare var Pidie: any;
declare var jQuery: any;
declare var $: any;
declare var google: any; 

@Injectable({
  providedIn: 'root'
})
export class MainstartService {
  /**
   * 
   */
  constructor() { }

  public onStarted() {
    (function($) {

      'use strict';
    
      
      // bootstrap dropdown hover
    
      // loader
      var loader = function() {
        setTimeout(function() { 
          if($('#loader').length > 0) {
            $('#loader').removeClass('show');
          }
        }, 1);
      };
      loader();
    
      // Stellar
      $(window).stellar();
    
      
      $('nav .dropdown').hover(function(){
        var $this = $(this);
        $this.addClass('show');
        $this.find('> a').attr('aria-expanded', true);
        $this.find('.dropdown-menu').addClass('show');
      }, function(){
        var $this = $(this);
          $this.removeClass('show');
          $this.find('> a').attr('aria-expanded', false);
          $this.find('.dropdown-menu').removeClass('show');
      });
    
    
      $('#dropdown04').on('show.bs.dropdown', function () {
        console.log('show');
      });
    
    
    
      // home slider
      $('.home-slider').owlCarousel({
        loop:true,
        autoplay: true,
        margin:10,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        nav:true,
        autoplayHoverPause: true,
        items: 1,
        navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
        responsive:{
          0:{
            items:1,
            nav:false
          },
          600:{
            items:1,
            nav:false
          },
          1000:{
            items:1,
            nav:true
          }
        }
      });
    
      // owl carousel
      var majorCarousel = $('.js-carousel-1');
      majorCarousel.owlCarousel({
        loop:true,
        autoplay: false,
        stagePadding: 0,
        margin: 10,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        nav: false,
        dots: false,
        autoplayHoverPause: false,
        items: 3,
        responsive:{
          0:{
            items:1,
            nav:false
          },
          600:{
            items:2,
            nav:false
          },
          1000:{
            items:3,
            nav:true,
            loop:false
          }
        }
      });
      //------- testimonial carousel --------//
      if($('.owl-carousel').length > 0){
        $('.testi-carousel').owlCarousel({
          loop:true,
          autoplay: true,
          margin:30,
          smartSpeed: 600,
          nav:false,
          dots: true,
          responsive:{
            0:{
              items:1
            },
            800:{
              items:2
            },
            1000:{
              items:3
            }
          }
        })
      }
    
      // cusotm owl navigation events
      $('.custom-next').click(function(event){
        event.preventDefault();
        // majorCarousel.trigger('owl.next');
        majorCarousel.trigger('next.owl.carousel');
    
      })
      $('.custom-prev').click(function(event){
        event.preventDefault();
        // majorCarousel.trigger('owl.prev');
        majorCarousel.trigger('prev.owl.carousel');
      })
    
      // owl carousel
      var major2Carousel = $('.js-carousel-2');
      major2Carousel.owlCarousel({
        loop:true,
        autoplay: true,
        stagePadding: 7,
        margin: 20,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        nav: false,
        autoplayHoverPause: true,
        items: 4,
        navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
        responsive:{
          0:{
            items:1,
            nav:false
          },
          600:{
            items:3,
            nav:false
          },
          1000:{
            items:4,
            nav:true,
            loop:false
          }
        }
      });
    
    
     
    
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
      // Gallery
      $('.img-gal').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
      });

      
      var defaults = {
        showClear: true,
        showClose: true,
        allowInputToggle: true,
        useCurrent: false,
        ignoreReadonly: true,
        minDate: new Date(),
        toolbarPlacement: 'top',
        locale: 'nl',
        icons: {
          time: 'fa fa-clock-o',
          date: 'fa fa-calendar',
          up: 'fa fa-angle-up',
          down: 'fa fa-angle-down',
          previous: 'fa fa-angle-left',
          next: 'fa fa-angle-right',
          today: 'fa fa-dot-circle-o',
          clear: 'fa fa-trash',
          close: 'fa fa-times'
        }
      };

      (function() {
        var optionsDatetime = $.extend({}, defaults, {format:'DD-MM-YYYY HH:mm'});
        var optionsTime = $.extend({}, defaults, {format:'HH:mm'});
        var optionsDate = $.extend({}, defaults, {format:'DD-MM-YYYY'});
        $('#arrival_date, #departure_date').datetimepicker(optionsDatetime);
        // $('#timepicker1, #timepicker2').datetimepicker(optionsTime);
      })();
    
      function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var grayStyles = [
          {
            featureType: "all",
            stylers: [
              { saturation: -90 },
              { lightness: 50 }
            ]
          },
          {elementType: 'labels.text.fill', stylers: [{color: '#A3A3A3'}]}
        ];
        var map = new google.maps.Map($('#map'), {
          center: {lat: -31.197, lng: 150.744},
          zoom: 9,
          styles: grayStyles,
          scrollwheel:  false
        });
      }

      // initMap();
      

    })(jQuery);
  }
}
