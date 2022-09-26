import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tour} from "../model/tour";
const API_URL ="http://localhost:3000/tuors"

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private httpClient: HttpClient) {}
  findAll(): Observable<Tour[]>{
    return this.httpClient.get<Tour[]>(API_URL);
  }
  create(tour: Tour): Observable<void>{
    return this.httpClient.post<void>(API_URL, tour)
  }
  deleteTour(id?: number): Observable<Tour>{
    return this.httpClient.delete(API_URL +'/'+id)
  }
  findBy(id?: number): Observable<Tour>{
    return this.httpClient.get(API_URL +'/'+id)
  }
  update(id: number, tour: Tour): Observable<void>{
    return this.httpClient.put<void>(API_URL +'/'+id, tour)
  }
}
