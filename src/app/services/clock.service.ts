import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer, Subscription, Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { SessionLogService } from './session-log.service';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private initialTime = 0.1 * 60; // 25 minutes in seconds
  private timer$: BehaviorSubject<number> = new BehaviorSubject(this.initialTime);
  private timerSubscription: Subscription | undefined;
  private isPaused = false;
  private currentTime = this.initialTime;
  private pomodoroCounter = 0;
  private completedPomodoros: { count: number, time: string }[] = [];
  private isRunning$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private autoReset$: Subject<void> = new Subject<void>();

  constructor(private sessionLogService: SessionLogService) { }

  start() {
    // Si ya hay una suscripción activa y no está pausado, no hacer nada
    if (this.timerSubscription && !this.timerSubscription.closed && !this.isPaused) {
      return;
    }

    // Si está pausado, continuar desde el tiempo actual
    const startTime = this.isPaused ? this.currentTime : this.initialTime;
    this.isPaused = false;
    this.isRunning$.next(true);

    this.timerSubscription = timer(0, 1000).pipe(
      take(startTime + 1),
      map(i => startTime - i),
      tap(val => {
        if (val === 0) {
          this.pomodoroCounter++;
          const now = new Date();
          const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          this.completedPomodoros.push({ count: this.pomodoroCounter, time });
          this.sessionLogService.updatePomodoros(this.completedPomodoros);
          this.reset();
          this.autoReset$.next();
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
      this.isRunning$.next(false);
    }
  }

  reset() {
    console.log('[DEBUG] ClockService.reset() called');
    console.log('[DEBUG] Before reset - currentTime:', this.currentTime, 'isPaused:', this.isPaused, 'isRunning:', this.isRunning$.value);
    if (this.timerSubscription) {
      console.log('[DEBUG] Unsubscribing timer subscription');
      this.timerSubscription.unsubscribe();
    }
    this.isPaused = false;
    this.currentTime = this.initialTime;
    console.log('[DEBUG] Resetting timer to initialTime:', this.initialTime);
    this.timer$.next(this.initialTime);
    this.isRunning$.next(false);
    console.log('[DEBUG] After reset - currentTime:', this.currentTime, 'isPaused:', this.isPaused, 'isRunning:', this.isRunning$.value);
  }

  getTimer(): Observable<number> {
    return this.timer$.asObservable();
  }

  getIsRunning(): Observable<boolean> {
    return this.isRunning$.asObservable();
  }

  getAutoReset(): Observable<void> {
    return this.autoReset$.asObservable();
  }
}
