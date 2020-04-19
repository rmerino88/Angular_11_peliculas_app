import { Component } from '@angular/core';
import { FilmsService } from './services/films.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peliculas-app';
  constructor(private filmsService: FilmsService) {
    this.filmsService.test().subscribe(
      resp => console.log(resp)
    );
  }
}
