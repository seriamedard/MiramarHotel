import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HolidayComponent } from './home/holiday/holiday.component';
import { FooterComponent } from './footer/footer.component';
import { BooknowComponent } from './booknow/booknow.component';
import { MainstartService } from './services/mainstart.service';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RoomsComponent } from './rooms/rooms.component';
import { EventsComponent } from './events/events.component';
import { DomainComponent } from './domain/domain.component';
import { AvisclientComponent } from './avisclient/avisclient.component';
import { GalleryComponent } from './gallery/gallery.component';
import { OneblogComponent } from './oneblog/oneblog.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { from } from 'rxjs';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HolidayComponent,
    FooterComponent,
    BooknowComponent,
    AboutComponent,
    ContactUsComponent,
    RoomsComponent,
    EventsComponent,
    DomainComponent,
    AvisclientComponent,
    GalleryComponent,
    OneblogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,

    NgxIntlTelInputModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,

    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,

    FormsModule,
    ReactiveFormsModule,

    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule

  ],
  providers: [
    MainstartService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
