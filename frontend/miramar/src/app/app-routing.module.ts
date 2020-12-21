import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BooknowComponent } from './booknow/booknow.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { OneblogComponent } from './oneblog/oneblog.component';
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "accueil", component: HomeComponent},
  {path: "chambres", component: RoomsComponent},
  {path: "evenements", component: EventsComponent},
  {path: "evenements/:id", component: OneblogComponent},
  {path: "apropos", component: AboutComponent},
  {path: "contactez-nous", component: ContactUsComponent},
  {path: 'reservation', component: BooknowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
