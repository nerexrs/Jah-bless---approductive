import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionLogComponent } from './session-log.component';
import { FormatTimePipe } from '../clock/format-time.pipe';



@NgModule({
  declarations: [
    SessionLogComponent
  ],
  imports: [
    CommonModule,
    FormatTimePipe
  ],
  exports: [
    SessionLogComponent
  ]
})
export class SessionLogModule { }
