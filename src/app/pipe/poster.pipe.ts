import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform(poster: string): string {

    if( poster ) {

      return `https://image.tmdb.org/t/p/w500/${poster}`;

    }else{
      return './assets/no-image.jpg';
    }
    //<img src="https://image.tmdb.org/t/p/w500/{{movie.poster_path}}" alt="" class="img-fluid poster">
    console.log(poster);
    return poster;
  }

}
