import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { FilmShortInfoModel } from 'src/app/models/film.short.info.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  populares: FilmShortInfoModel[] = [];
  infantiles: FilmShortInfoModel[] = [];
  public routeAndWeight = 'https://image.tmdb.org/t/p/w200/';

  constructor( private filmsService: FilmsService) { }

  ngOnInit() {
    this.filmsService.getPopulares().subscribe(
      resp => this.populares = resp
    );
    this.filmsService.getPopularesInfantiles().subscribe(
      resp => this.infantiles = resp
    );
  }

}
