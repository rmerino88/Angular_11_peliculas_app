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

  getDetailFilm(filmID?: number) {
    const url = `${this.urlMovieDb}/movie/${filmID}?api_key=${this.apikey}${this.languageEs}`;
    return this.httpClient.get(url);
  }

  getPopulares(pageNumber?: number, region?: string) {

    let pageNumberQuery = '';
    let regionQuery = '';
    if (pageNumber) {
      pageNumberQuery = `&page=${pageNumber}`;
    }
    if (regionQuery) {
      regionQuery = `&region=${region}`;
    }

    const url = `${this.urlMovieDb}/discover/movie?sort_by=popularity.desc${pageNumberQuery}${regionQuery}${this.languageEs}&api_key=${this.apikey}`;

    return this.httpClient.get(url).pipe(
      map((resp: any) => {
        if (!resp.results) {
          return;
        }
        return this.generateList(resp.results);
      })
    );
  }

  getPopularesEsp(pageNumber: number) {
    return this.getPopulares(pageNumber, 'ES');
  }

  getCartelera() {

    const desdeStr = this.formatDate();
    const hastaStr = this.formatDate();

    const url = `${this.urlMovieDb}/discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}${this.languageEs}&api_key=${this.apikey}`;
    console.log(url);
    return this.httpClient.get(url).pipe(
      map((resp: any) => {
        if (!resp.results) {
          return;
        }
        return this.generateList(resp.results);
      })
    );
  }

  buscarPelicula(term: string) {
    const url = `${this.urlMovieDb}/search/movie?query=${term}&sort_by=popularity.desc&api_key=${this.apikey}${this.languageEs}`;
    return this.httpClient.get(url).pipe(
      map((resp: any) => {
        if (!resp.results) {
          return;
        }
        return this.generateList(resp.results);
      })
    );
  }

  getFiveSugerences(term: string) {
    const url = `${this.urlMovieDb}/search/movie?query=${term}&api_key=${this.apikey}${this.languageEs}`;
    console.log(url);
    return this.httpClient.get(url).pipe(
      map((resp: any) => {
        const sugerences: string[] = [];
        resp.results.forEach(element => {
          if (!sugerences.includes(element.title)) {
            sugerences.push(element.title);
          }
        });
        return sugerences;
      })
    );
  }

  private formatDate(): string {
    const d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  private generateList(results: object[]) {
    const films: FilmShortInfoModel[] = [];
    results.forEach(
      (elem: any) => {
        let genres: string[] = [];
        if (elem.genre_ids) {
          genres = this.populateGenres(elem.genre_ids);
        }
        films.push(new FilmShortInfoModel(elem.id, elem.title, elem.release_date, genres, elem.overview, elem.poster_path));
      }
    );
    return films;
  }

  private getGenres() {
    const url = `${this.urlMovieDb}/genre/movie/list?api_key=${this.apikey}${this.languageEs}`;
    return this.httpClient.get(url).subscribe(
      (resp: any) => {
        this.initializeGenres(resp.genres);
      }
    );
  }

  private populateGenres(genreIds: string[]) {
    const filmGenres: string[] = [];
    genreIds.forEach(key => {
      filmGenres.push(this.genres.get(key));
    });
    return filmGenres;
  }

  private initializeGenres(genres: any[]) {
    genres.forEach(
      elem => this.genres.set(elem.id, elem.name)
    );
  }

  test() {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/550?api_key=${ this.apikey }${ this.languageEs }`).pipe(
      map(resp => resp)
    );
  }

}
