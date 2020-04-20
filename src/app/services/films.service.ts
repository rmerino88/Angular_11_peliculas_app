import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FilmShortInfoModel } from '../models/film.short.info.model';


@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private apikey = '4657431159112caae0426c3da4079c54';
  private urlMovieDb = 'https://api.themoviedb.org/3';

  private languageEs = '&language=es';
  private languageEn = '&language=en';
  private genres = new Map();

  constructor(private httpClient: HttpClient) {
    this.getGenres();
  }

  getGenres() {

    const url = `${ this.urlMovieDb }/genre/movie/list?api_key=${ this.apikey }${ this.languageEs }`;

    return this.httpClient.jsonp(url, 'callback' ).subscribe(
      (resp: any) => {
        this.initializeGenres(resp.genres);
     }
   );
  }

  getPopulares() {

    const url = `${ this.urlMovieDb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }${ this.languageEs }`;

    return this.httpClient.jsonp(url, 'callback' ).pipe(
      map( (resp: any) => {
        if (!resp.results) {
          return;
        }
        return this.generateList(resp.results);
      })
    );
  }

  getPopularesInfantiles() {

    const url = `${ this.urlMovieDb }/discover/movie?region=ES&api_key=${ this.apikey }${ this.languageEs }`;

    return this.httpClient.jsonp(url, 'callback' ).pipe(
              map( (resp: any) => {
                if (!resp.results) {
                  return;
                }
                return this.generateList(resp.results);
              })
            );
  }

  buscarPelicula( texto: string ) {

    const url = `${ this.urlMovieDb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }${ this.languageEs }`;

    return this.httpClient.jsonp(url, 'callback' ).pipe(
              map( resp => resp)
            );
  }

  test() {
    // return this.httpClient.get(`https://api.themoviedb.org/3/movie/550?api_key=${ this.apikey }${ this.languageEs }`);
    return this.httpClient.jsonp('https://api.themoviedb.org/3/movie/550?api_key=4657431159112caae0426c3da4079c54', 'callback').pipe(
      map( resp => resp )
    );
  }

  private generateList(results: object[]) {
    const films: FilmShortInfoModel[] = [];
    results.forEach(
      (elem: any) => {
        let genres: string[] = [];
        if (elem.genre_ids) {
          genres = this.populateGenres(elem.genre_ids);
        }
        films.push(new FilmShortInfoModel(elem.title, elem.release_date, genres, elem.overview, elem.poster_path));
      }
    );
    return films;
  }

  private populateGenres(genreIds: string[]) {
    const filmGenres: string[] = [];
    genreIds.forEach( key => {
      filmGenres.push(this.genres.get(key));
    });
    return filmGenres;
  }

  private initializeGenres(genres: any[]) {
    genres.forEach(
      elem => this.genres.set(elem.id, elem.name)
    );
  }

}
