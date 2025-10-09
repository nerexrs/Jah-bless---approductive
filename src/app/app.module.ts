import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './modulos/navbar/navbar.module';
import { ClockModule } from './modulos/clock/clock.module';
import { SessionLogModule } from './modulos/session-log/session-log.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    ClockModule,
    SessionLogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
