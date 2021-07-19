import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseURL: string = "https://api.themoviedb.org/3";
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: 'b5c24640d16afcff2f1b76c2ce6aad7d',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  resetContadorPage(){
    this.carteleraPage = 1;
  }

  getPeliculaDetalle(id: string) {
    return this.http.get<MovieResponse>(`${this.baseURL}/movie/${id}`, {
      params: this.params
    });
  }


  getCartelera(): Observable<Movie[]>{

    if(this.cargando){
      return of([]);
    }

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.baseURL}/movie/now_playing`, {params: this.params})
      .pipe(
        map( (resp)=> resp.results ), 
        tap( ()=> {
        this.carteleraPage += 1;
        this.cargando = false;
      }) );

  }

  buscarPeliculas(pelicula: string): Observable<Movie[]>{

    const params = {...this.params, page: '1', query: pelicula};

    return this.http.get<CarteleraResponse>(`${this.baseURL}/search/movie`, {
      params
    })
    .pipe(map( resp => resp.results));

  }

}
