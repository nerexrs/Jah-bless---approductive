import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionLogComponent } from './session-log.component';



@NgModule({
  declarations: [
    SessionLogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SessionLogComponent
  ]
})
export class SessionLogModule { }
