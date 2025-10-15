import { Component, OnInit } from '@angular/core';
import { SessionLogService } from '../../services/session-log.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-session-log',
  standalone: false,
  templateUrl: './session-log.component.html',
  styleUrl: './session-log.component.scss'
})
export class SessionLogComponent implements OnInit {
  pomodoros$!: Observable<number[]>;

  constructor(private sessionLogService: SessionLogService) { }

  ngOnInit() {
    this.pomodoros$ = this.sessionLogService.pomodoros$;
  }
}
