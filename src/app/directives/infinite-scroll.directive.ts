import {
    Directive,
    ElementRef,
    EventEmitter,
    Output,
    AfterViewInit,
    OnDestroy,
  } from '@angular/core';
  
  @Directive({
    selector: '[appInfiniteScroll]',
    standalone: true,
  })
  export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {
    @Output() scrolled = new EventEmitter<void>();
  
    private observer!: IntersectionObserver;
  
    constructor(private el: ElementRef) {}
  
    ngAfterViewInit() {
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.scrolled.emit();
        }
      });
  
      this.observer.observe(this.el.nativeElement);
    }
  
    ngOnDestroy() {
      this.observer.disconnect();
    }
  }
  