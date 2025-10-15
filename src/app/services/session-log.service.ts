import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionLogService {
  private pomodorosSubject = new BehaviorSubject<{ count: number, time: string }[]>([]);
  pomodoros$ = this.pomodorosSubject.asObservable();

  updatePomodoros(pomodoros: { count: number, time: string }[]) {
    this.pomodorosSubject.next(pomodoros);
  }
}