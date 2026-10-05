import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'jf-teaser',
  standalone: true,
  templateUrl: './teaser.component.html',
  styleUrls: ['./teaser.component.scss'],
})
export class JfTeaserComponent {
  readonly isOpen = signal(false);
}
