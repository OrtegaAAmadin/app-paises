import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent implements OnInit {

  termino = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino).subscribe( paises => {
      this.paises = paises;
    }, err => {
      this.hayError = true;
      this.paises = [];
    });
  }

  sugerencias(termino: any){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias =true;
    this.paisService.buscarPais(termino).subscribe(paises => {
      this.paisesSugeridos = paises.splice(0,5)
      
    },err => {this.paisesSugeridos = []})
    
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
    
  }
}
