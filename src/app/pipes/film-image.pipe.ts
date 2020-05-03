import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filmImage'
})
export class FilmImagePipe implements PipeTransform {
  private routeAndWeight500 = 'https://image.tmdb.org/t/p/w500';

  transform(film: any, ...args: string[]): any {
    let route = '';

    if (film.image) {
      route = this.routeAndWeight500 + film.image;
    } else {
      route = 'assets/img/no-available.jpg';
    }

    if (args[0] && args[0] === 'backgorund') {
      return 'url( ' + route + ' )';
    }


  }
}
