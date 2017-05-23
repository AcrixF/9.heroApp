import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import { Heroe } from "../interfaces/heroe.interface";
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

  heroesURL: string = 'https://heroesapp-28855.firebaseio.com/Heroes.json';
  heroeURL: string = 'https://heroesapp-28855.firebaseio.com/Heroes/';


  constructor(private http: Http) { }


  nuevoHeroe(heroe: Heroe){
    let body = JSON.stringify( heroe );
    let headers = new Headers({
      'Contente-Type':'application/json'
    });


    return this.http.post( this.heroesURL, body,  { headers: headers })
            .map(res => {
              console.log(res.json());
              return res.json();
            })
  }


  actualizaHero(heroe: Heroe, key$ : string){

    let body = JSON.stringify( heroe );
    let headers = new Headers({
      'Contente-Type':'application/json'
    });

    let url = `${ this.heroeURL }/${ key$ }.json`;

    return this.http.put(url , body, { headers:headers }) .map(res => {
      console.log(res.json());
      return res.json();
    });

  }

  getHeroe (key$: string){
      let url = `${ this.heroeURL }/${ key$ }.json`;
      return this.http.get( url ).map( res => res.json());
  };


  getHeroes (){
    return this.http.get(this.heroesURL).map( res => {console.log(res); return  res.json();  });
  };


  borrarHeroe(key$:string){
    let url = `${  this.heroeURL }/${ key$ }.json`;
    return this.http.delete(url).map(res => console.log(res));
  }

}
