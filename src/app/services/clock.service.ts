import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private initialTime = 25 * 60; // 25 minutes in seconds
  private timer$: BehaviorSubject<number> = new BehaviorSubject(this.initialTime);
  private timerSubscription: Subscription | undefined;
  private isPaused = false;
  private currentTime = this.initialTime;

  constructor() { }

  start() {
    if (this.timerSubscription && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
    }

    const startTime = this.isPaused ? this.currentTime : this.initialTime;
    this.isPaused = false;

    this.timerSubscription = timer(0, 1000).pipe(
      take(startTime + 1),
      map(i => startTime - i)
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

  getTimer(): Observable<number> {
    return this.timer$.asObservable();
  }
}
