import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionLogService {
  private pomodorosSubject = new BehaviorSubject<number[]>([]);
  pomodoros$ = this.pomodorosSubject.asObservable();

  updatePomodoros(pomodoros: number[]) {
    this.pomodorosSubject.next(pomodoros);
  }
}