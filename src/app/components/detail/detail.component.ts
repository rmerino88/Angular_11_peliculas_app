import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  notFound = false;
  loading = true;
  film: any;

  private KEY_ID = 'id';
  private KEY_ID_FILM = 'idFilm';
  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private filmsService: FilmsService) {

    this.activatedRoute.params.subscribe(
      params => {
        let idValue = params[this.KEY_ID];
        if (!idValue) {
          idValue = params[this.KEY_ID_FILM];
        }
        if (!idValue) {
          this.notFound = true;
          return;
        }
        this.filmsService.getDetailFilm(idValue).subscribe(
          resp => {
            if (!resp) {
              this.notFound = true;
            }
            this.film = resp;
            this.loading = false;
        });
    });
   }

  ngOnInit() { }

  back() {
    this.location.back();
  }
}
