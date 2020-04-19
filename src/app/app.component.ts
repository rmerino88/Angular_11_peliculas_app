import { Component } from '@angular/core';
import { PeliculasService } from './servcices/peliculas.service';
import { PeliculasAltService } from './servcices/peliculasAlt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peliculas-app';

  constructor(private filmsService: PeliculasService,
              private filmsAltService: PeliculasAltService) {
    this.filmsService.test().subscribe(resp => {
      console.log(resp);
    });
    // this.filmsAltService.getPopularesOriginal().subscribe(resp => {
    //   console.log(resp);
    // });
  }
}
