import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private apikey = '4657431159112caae0426c3da4079c54';
  private urlMovieDb = 'https://api.themoviedb.org/3';

  private languageEs = '&language=es';
  private languageEn = '&language=en';

  constructor(private httpClient: HttpClient) { }


  getPopulares() {

    const url = `${ this.urlMovieDb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }${ this.languageEs }`;

    return this.httpClient.jsonp(url, 'callback' ).pipe(
              map( resp => resp )
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

}
