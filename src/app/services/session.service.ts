import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Session {
  type: 'Pomodoro' | 'Short Break' | 'Long Break';
  duration: number;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly sessions = new BehaviorSubject<Session[]>([]);
  readonly sessions$ = this.sessions.asObservable();

  addSession(session: Session) {
    const currentSessions = this.sessions.getValue();
    this.sessions.next([...currentSessions, session]);
  }
}