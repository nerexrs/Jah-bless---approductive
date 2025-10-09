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

  constructor() { }

  start() {
    if (this.timerSubscription && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
    }

    this.timer$.next(this.initialTime);

    this.timerSubscription = timer(0, 1000).pipe(
      take(this.initialTime + 1),
      map(i => this.initialTime - i)
    ).subscribe(val => this.timer$.next(val));
  }

  getTimer(): Observable<number> {
    return this.timer$.asObservable();
  }
}
