import { Component, OnInit, Input } from '@angular/core';
import { FilmShortInfoModel } from 'src/app/models/film.short.info.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styles: []
})
export class GalleryComponent implements OnInit {

  @Input('films') films: FilmShortInfoModel[];
  @Input('title') title: string;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  goToDetail(index: number) {
    this.router.navigate(['detail', this.films[index].id]);
  }
}
