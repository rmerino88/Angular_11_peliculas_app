import { Injectable } from '@angular/core';
// Estas librerías se encuentra deprecada
import { Jsonp } from "@angular/http";
// import 'rxjs/Rx'; // Map
// En la documentación de Angular aconsejan un uso alternativo
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
// import { catchError } from 'rxjs/operators';
// import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PeliculasAltService {

  private apikey = '4657431159112caae0426c3da4079c54';
  private urlMoviedb = 'https://api.themoviedb.org/3';

  constructor( private jsonp: Jsonp, private http: HttpClient ) { }

  getPopularesOriginal() {

    const url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;
    // Durante el curso se realiza la función json() sobre el response, y el sistema lo permite
    // Esto es debido a que en estos casos la respuesta es un observable con un response en su interior
    // Observable<Response>

    // En nuestro caso no podemos utilizar ese josn() por que lo que obetenemos de nuestro servicio
    // es un Observable<Object> y no se puede utilizar esa función sobre un objeto
    return this.jsonp.get( url ).pipe(
      map( resp => resp.json() )
    );
  }

  getPopulares() {

    const url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url, 'callback').pipe(
      // catchError(er => this.handleError('searchHeroes', []))
      // catchError(er => of([]))
      map( resp => resp )
    );

  }

  handleError(metodo: string, args: string[]) {
    console.log(`ERROR en la ${metodo}...`);
    return;
  }

  buscarPeliculaOriginal( texto: string ) {

    const url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url ).pipe( map( resp => resp.json()) );
  }

}
