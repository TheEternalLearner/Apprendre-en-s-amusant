import { Component, OnInit } from '@angular/core';
import { Section } from '../models/section.model';
import { SectionComponent } from "../section/section";

@Component({
  selector: 'app-home',
  imports: [SectionComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  public sections: Section[] = [
      new Section("Cours disponibles", 'https://cdn.pixabay.com/photo/2015/11/26/09/14/school-1063556_960_720.jpg', '/cours'),
      new Section("Notre Approche pédagogique", 'https://cdn.pixabay.com/photo/2015/11/26/09/14/school-1063556_960_720.jpg', '/methodes'),
      new Section("Stage et Ateliers", 'https://cdn.pixabay.com/photo/2015/11/26/09/14/school-1063556_960_720.jpg', '/stages')
    ];
}
