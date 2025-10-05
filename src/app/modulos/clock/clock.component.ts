import { Component, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnDestroy {
  minutes: number = 25;
  seconds: number = 0;
  timerSubscription: Subscription | undefined;
  isPaused: boolean = false;

  constructor(private sessionService: SessionService) {}

  startTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.isPaused = false;
    const totalSeconds = this.minutes * 60 + this.seconds;

    this.timerSubscription = timer(0, 1000).subscribe(t => {
      const remainingSeconds = totalSeconds - t;
      if (remainingSeconds >= 0 && !this.isPaused) {
        this.minutes = Math.floor(remainingSeconds / 60);
        this.seconds = remainingSeconds % 60;
      } else if (remainingSeconds < 0) {
        this.finishSession();
      }
    });
  }

  pauseTimer() {
    this.isPaused = true;
  }

  resetTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.minutes = 25;
    this.seconds = 0;
    this.isPaused = false;
  }

  finishSession() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.sessionService.addSession({ type: 'Pomodoro', duration: 25, date: new Date() });
    this.resetTimer();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}