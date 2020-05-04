import { Component, Input, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { FilmShortInfoModel } from 'src/app/models/film.short.info.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  results: FilmShortInfoModel[] = [];
  sugerencias: string[] = [];
  term: string;

  KEY_PARAMS = 'termToSearch';
  // @Input() termToSearchFromNavbar: number;

  constructor(private filmsService: FilmsService,
              private router: Router,
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
    // this.router.navigate(['search', this.term]);
    let termToSearch = this.term;
    this.sugerencias = [];
    if (term) {
      termToSearch = term;
    }
    this.filmsService.buscarPelicula(termToSearch).subscribe(
      resp => this.results = resp
    );
  }
}
