import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClockService } from '../../services/clock.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: false,
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements OnInit, OnDestroy {
  timer$!: Observable<number>;
  isRunning$!: Observable<boolean>;
  private isRunningSubscription: Subscription | undefined;
  private isRunningValue: boolean = false;
  private autoResetSubscription: Subscription | undefined;
  private isRotated: boolean = false;

  constructor(private clockService: ClockService, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.timer$ = this.clockService.getTimer();
    this.isRunning$ = this.clockService.getIsRunning();
    this.isRunningSubscription = this.isRunning$.subscribe(isRunning => {
      this.isRunningValue = isRunning;
    });
    this.timer$.subscribe(timerValue => {
      console.log('[DEBUG] Timer value changed:', timerValue);
    });
    this.autoResetSubscription = this.clockService.getAutoReset().subscribe(() => {
      console.log('[DEBUG] Auto reset triggered');
      const button = this.el.nativeElement.querySelector('.play-pause-btn');
      if (button) {
        console.log('[DEBUG] Adding auto-reset class to play-pause button');
        this.renderer.addClass(button, 'auto-reset');
        setTimeout(() => {
          console.log('[DEBUG] Removing auto-reset class from play-pause button');
          this.renderer.removeClass(button, 'auto-reset');
        }, 500);
      }
    });
  }

  ngOnDestroy() {
    if (this.isRunningSubscription) {
      this.isRunningSubscription.unsubscribe();
    }
    if (this.autoResetSubscription) {
      this.autoResetSubscription.unsubscribe();
    }
  }

  togglePlayPause() {
    if (this.isRunningValue) {
      this.pause();
    } else {
      this.toggleStartPause();
    }
  }

  toggleStartPause() {
    this.clockService.start();
  }

  pause() {
    this.clockService.pause();
  }

  reset() {
    console.log('[DEBUG] Reset button clicked. Current timer value:', this.timer$);
    const svg = this.el.nativeElement.querySelector('.reset-btn svg');
    if (svg) {
      console.log('[DEBUG] SVG element found. Current classes:', svg.className);
      // Toggle the rotated class
      if (this.isRotated) {
        this.renderer.removeClass(svg, 'rotated');
        this.renderer.addClass(svg, 'second-rotate');
        setTimeout(() => {
          this.renderer.removeClass(svg, 'second-rotate');
        }, 500);
        console.log('[DEBUG] Removed rotated class and added second-rotate');
      } else {
        this.renderer.addClass(svg, 'rotated');
        console.log('[DEBUG] Added rotated class');
      }
      this.isRotated = !this.isRotated;
      console.log('[DEBUG] After toggle, classes:', svg.className);
    } else {
      console.log('[DEBUG] SVG element not found');
    }
    console.log('[DEBUG] Calling clockService.reset()');
    this.clockService.reset();
    console.log('[DEBUG] Reset completed');
  }
}
