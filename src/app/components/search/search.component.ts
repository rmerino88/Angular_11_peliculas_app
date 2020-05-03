import { Component, Input, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { FilmShortInfoModel } from 'src/app/models/film.short.info.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  results: FilmShortInfoModel[] = [];
  sugerencias: string[] = [];
  term = '';

  KEY_PARAMS = 'termToSearch';
  // @Input() termToSearchFromNavbar: number;

  constructor(private filmsService: FilmsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        if (params[this.KEY_PARAMS]) {
          this.term = params[this.KEY_PARAMS];
          this.buscar();
        }
      }
    );
  }

  getFivesugerences() {
    console.log(this.term);
    if (this.term.length > 4) {
      this.filmsService.getFiveSugerences(this.term).subscribe(
        (resp: string[]) => this.sugerencias = resp
      );
    }
  }

  buscar(term?: string) {
    let termToSearch = this.term;
    this.sugerencias = [];
    // this.term = '';
    if (term) {
      termToSearch = term;
    }
    this.filmsService.buscarPelicula(termToSearch).subscribe(
      resp => this.results = resp
    );
  }
}
