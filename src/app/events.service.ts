import { Injectable } from '@angular/core';
import { EventResponse, Achnowledgmenet} from './interfaces';
import { HttpClient} from '@angular/common/http';
import { Observable, Observer, onErrorResumeNext} from 'rxjs';

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
      const url = '${this.endpoint}${route}';
      return this.http.get<T>;
  }

  getLatest(): Observable<EventResponse>{
      const route = '/latest';
      return this.getByRouter(route);
  }

  getById(id: number): Observable<EventResponse>{
      const route = '/event/${id}';
      return this.getByRouter(route);
  }

  getAcknowledgements(event: EventResponse): Observable<Achnowledgmenet[]>{
      return this.getByRouter<Achnowledgmenet[]>(event.links.acknowledgements);
  }
}
