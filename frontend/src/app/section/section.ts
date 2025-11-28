import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from '../models/section.model';

@Component({
  selector: 'app-section',
  imports: [],
  templateUrl: './section.html',
  styleUrl: './section.css'
})

export class SectionComponent {

  private router = inject(Router)
  @Input() section!: Section;
  
  onClick() {
    this.router.navigate([this.section.url]);
  }

}
