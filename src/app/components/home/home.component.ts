import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { FilmShortInfoModel } from 'src/app/models/film.short.info.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  cartelera: FilmShortInfoModel[] = [];

  popularesStart = 1;
  popularesCurrent = 1;
  populares: FilmShortInfoModel[] = [];

  groupPopularesEsp: FilmShortInfoModel[][] = [];
  groupPopularesEspPage = 1;

  loading = true;

  routeAndWeight = 'https://image.tmdb.org/t/p/w200/';

  constructor( private filmsService: FilmsService) { }

  ngOnInit() {
    this.filmsService.getCartelera().subscribe(
      resp => {
        this.cartelera = resp;
        this.loading = false;
    }
    );
    this.filmsService.getPopulares().subscribe(
      resp => this.populares = resp
    );
    this.filmsService.getPopularesEsp(this.groupPopularesEspPage).subscribe(
      resp => {
        this.makeGroupPopularesEsp(resp);
    });
  }


  loadMorePopularesEsp() {
    this.groupPopularesEspPage++;
    this.filmsService.getPopularesEsp(this.groupPopularesEspPage).subscribe(
      resp => this.makeGroupPopularesEsp(resp)
    );
  }

  loadPagePopulares(pageNumber: number) {
    if (pageNumber === this.popularesCurrent) {
      return;
    }
    this.popularesCurrent = pageNumber;
    if (pageNumber > 2) {
      this.popularesStart = pageNumber - 2;
    }
    console.log('Page number: ' + pageNumber + ', y popularesStart:' + this.popularesStart);
    this.filmsService.getPopulares(pageNumber).subscribe(
      resp => this.populares = resp
      );
  }

  makeGroupPopularesEsp(films: FilmShortInfoModel[]) {
    let row = this.groupPopularesEsp.length;
    this.groupPopularesEsp[row] = [];
    films.forEach( (element, index) => {
      if (index !== 0 && index % 4 === 0 ) {
        row++;
        this.groupPopularesEsp[row] = [];
      }
      this.groupPopularesEsp[row].push(element);
    });
  }
}
