import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";
import { Heroe } from "../../interfaces/heroe.interface";
import swal from 'sweetalert2'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes: any[] = [];
  loading: boolean = true;

  constructor(private _heroesService: HeroesService) {

    this._heroesService.getHeroes().subscribe(data => {


      setTimeout( () => {this.loading = false;
        this.heroes = data;},2000)
    });

  }

  ngOnInit() {
  }


  confirmacion(key$: string){
    swal({
      title: '¿Estás seguro de eliminar?',
      text: "Está acción no podra revertirse!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then(function () {

      /*
        let service: HeroesService;
      service.borrarHeroe(key$).subscribe(respuesta => {
        if(respuesta){
          console.log(respuesta);
        }else{
          delete this.heroes[key$]
        }
      });

      */


      swal(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }, function (dismiss) {
      if (dismiss === 'cancel') {
        swal(
          'Cancelado',
          '',
          'success'
        )
      }
    })
  }


  eliminaHeroe(key$: string){
    this._heroesService.borrarHeroe(key$).subscribe(respuesta => {

      if(respuesta){
        console.log(respuesta);
      }else{
        delete this.heroes[key$]
      }
    })
  }


}
