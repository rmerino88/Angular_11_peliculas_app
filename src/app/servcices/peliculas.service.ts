import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apikey = '4657431159112caae0426c3da4079c54';
  private urlMovieDb = 'https://api.themoviedb.org/3';
  private languageEs = '&language=es';
  private languageEn = '&language=en';

  constructor(private httpClient: HttpClient) { }


  getPopulares() {

    const url = `${ this.urlMovieDb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }${this.languageEs}`;

    return this.httpClient.jsonp(url, 'callback' ).pipe(
              map( resp => resp )
            );
  }

  buscarPelicula( texto: string ) {

    const url = `${ this.urlMovieDb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }${this.languageEs}`;

    return this.httpClient.jsonp(url, 'callback' ).pipe(
              map( resp => resp)
            );
  }

  test() {
    // Se supone que esto debería de dar un error de crossDomain, que actualemente no se produce
    // return this.httpClient.get('https://api.themoviedb.org/3/movie/550?api_key=4657431159112caae0426c3da4079c54');

    // Para evitar el crossDomain que comentabamos deberemos realizar la llamada mediante Jsonp
    // Lo he intentado hacer haciendo uso de JsonpClientBackend, pero es que no es necesario todo esto
    // const request = new HttpRequest('GET', 'https://api.themoviedb.org/3/movie/550?api_key=4657431159112caae0426c3da4079c54');
    // return this.jsonpClient.handle(request);
    // return this.jsonpClient.handle(
    //   new HttpRequest('GET', 'https://api.themoviedb.org/3/movie/550?api_key=4657431159112caae0426c3da4079c54&callback=JSONP_CALLBACK')
    // );
    return this.httpClient.jsonp('https://api.themoviedb.org/3/movie/550?api_key=4657431159112caae0426c3da4079c54', 'callback').pipe(
      map( resp => resp )
    );
  }

}
