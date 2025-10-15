import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionLogService {
  private pomodorosSubject = new BehaviorSubject<{ count: number, time: string, duration: number }[]>([]);
  pomodoros$ = this.pomodorosSubject.asObservable();

  updatePomodoros(pomodoros: { count: number, time: string, duration: number }[]) {
    this.pomodorosSubject.next(pomodoros);
  }
}