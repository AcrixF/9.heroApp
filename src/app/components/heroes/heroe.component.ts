import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService }  from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe-edit',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  nuevo: boolean = false;
  id: string;

  private heroe: Heroe = {
    nombre: "",
    bio:"",
    casa:"Marvel"
  };

  constructor(private _heroeService: HeroesService,
              private router: Router,
              private route: ActivatedRoute) {

    this.route.params.subscribe(parametros =>
      { this.id = parametros['id'];
        if(this.id != "nuevo"){
        this._heroeService.getHeroe( this.id).subscribe( heroe => this.heroe = heroe);
      }
    })
  }

  ngOnInit() {
  }

  guardar(){

    if (this.id == "nuevo"){
      this._heroeService.nuevoHeroe( this.heroe )
        .subscribe( data => {
            this.router.navigate(['/heroe', data.name])
          },
          error =>console.log(error)
        )
    }else{
      this._heroeService.actualizaHero( this.heroe , this.id)
        .subscribe( data => {
            console.log(data)
          },
          error =>console.log(error)
        )
    }

  }

  agregarNuevo(forma: NgForm){
    this.router.navigate(['/heroe','nuevo']);
    forma.reset({
      casa: "Marvel"
    });
  }

}
