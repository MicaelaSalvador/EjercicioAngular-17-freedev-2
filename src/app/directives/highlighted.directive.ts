import { Directive, EventEmitter, Host, HostBinding, HostListener, Input, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Directive({
  selector: '[appHighlighted]',
  standalone: true
})
export class HighlightedDirective {

  constructor(
    // @Host()  private readonly apiService: ApiService
  ) {}

  @Input() appHighlighted = false;

  @Output() onToggleHighlighted = new EventEmitter<boolean>();

  @HostBinding('class.red-shadow')
    get cssClass() {
      return this.appHighlighted;
    }

  @HostListener('mouseenter')
    onMouseEnter() {
      this.appHighlighted = true;
      this.onToggleHighlighted.emit(this.appHighlighted);
    }

  @HostListener('mouseleave')
    onMouseLeave() {
      this.appHighlighted = false;
      this.onToggleHighlighted.emit(this.appHighlighted);
    }

  onToggle() {
    this.appHighlighted = !this.appHighlighted;
    this.onToggleHighlighted.emit(this.appHighlighted);
  }
}
