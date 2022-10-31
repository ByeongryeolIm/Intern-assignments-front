import {HttpClient} from "@angular/common/http";
import {Pageable} from "../../../shared/services/pageable.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

export interface Movie {
  id: number;
  subject: string;
  director: string;
  date: string | number | Date;
}

const URL = '/dna/practice/movies';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) {
  }

  list(params: Pageable): Observable<any> {
    return this.http.get<any>(`${URL}`, {params: params as any});
  }

  create(movie: Movie): Observable<Movie> {
    return this.http.post<any>(`${URL}`, movie);
  }

  find(id: number): Observable<Movie> {
    return  this.http.get<any>(`${URL}/${id}`);
  }

  update(id: number, movie: Movie): Observable<Movie>{
    return this.http.put<any>(`${URL}/${id}`, movie);
  }

  delete(id: number): Observable<Movie> {
    return this.http.delete<any>(`${URL}/${id}`);
  }
}
