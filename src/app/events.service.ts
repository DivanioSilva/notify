import { Injectable } from '@angular/core';
import { EventResponse, Acknowledgement} from './interfaces';
import { HttpClient} from '@angular/common/http';
import { Observable, Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private endpoint = 'https://us-central1-ps-notify-api.cloudfunctions.net/api';

  constructor(private http: HttpClient){}


  getAll(): Observable<EventResponse>{
    return Observable.create((observer: Observer<EventResponse>) => {
      const self = this;
      self.getLatest().subscribe( res => onNext(res), observer.error);

      function onNext(response: EventResponse){
        observer.next(response);
        if(response.links.next){
          self.getByRouter<EventResponse>(response.links.next).subscribe(res => onNext(res), observer.error);
        } else{
          observer.complete();
        }

      }
    });
  }

  private getByRouter<T>(router: String): Observable<T>{
      const url = `${this.endpoint}${router}`;
      return this.http.get<T>(url);
  }

  getLatest(): Observable<EventResponse>{
      const route = `/latest`;
      return this.getByRouter(route);
  }

  getById(id: Number): Observable<EventResponse>{
      const route = `/event/${id}`;
      return this.getByRouter(route);
  }

  getAcknowledgements(event: EventResponse): Observable<Acknowledgement[]>{
      return this.getByRouter<Acknowledgement[]>(event.links.acknowledgements);
  }
}
