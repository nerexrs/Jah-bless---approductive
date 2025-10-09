import { Component, OnInit } from '@angular/core';
import { ClockService } from '../../services/clock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clock',
  standalone: false,
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements OnInit {
  timer$!: Observable<number>;

  constructor(private clockService: ClockService) { }

  ngOnInit() {
    this.timer$ = this.clockService.getTimer();
  }

  start() {
    this.clockService.start();
  }
}
