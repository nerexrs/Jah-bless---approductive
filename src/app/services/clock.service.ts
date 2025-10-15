import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { SessionLogService } from './session-log.service';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private initialTime = 1 * 60; // 25 minutes in seconds
  private timer$: BehaviorSubject<number> = new BehaviorSubject(this.initialTime);
  private timerSubscription: Subscription | undefined;
  private isPaused = false;
  private currentTime = this.initialTime;
  private pomodoroCounter = 0;
  private completedPomodoros: number[] = [];

  constructor(private sessionLogService: SessionLogService) { }

  start() {
    if (this.timerSubscription && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
    }

    const startTime = this.isPaused ? this.currentTime : this.initialTime;
    this.isPaused = false;

    this.timerSubscription = timer(0, 1000).pipe(
      take(startTime + 1),
      map(i => startTime - i),
      tap(val => {
        if (val === 0) {
          this.pomodoroCounter++;
          this.completedPomodoros.push(this.pomodoroCounter);
          this.sessionLogService.updatePomodoros(this.completedPomodoros);
          this.reset();
        }
      })
    ).subscribe(val => {
      this.currentTime = val;
      this.timer$.next(val);
    });
  }

  pause() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.isPaused = true;
    }
  }

  reset() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.isPaused = false;
    this.currentTime = this.initialTime;
    this.timer$.next(this.initialTime);
  }

  getTimer(): Observable<number> {
    return this.timer$.asObservable();
  }
}
