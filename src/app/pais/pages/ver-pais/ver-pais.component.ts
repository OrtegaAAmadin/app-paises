import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais-interface';
@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {

  pais!: Country;
  constructor(private activatedRouter: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {
    /*this.activatedRouter.params.subscribe(params => {
      this.paisService.getPaisPorAlpha(params.id).subscribe( pais => {
        console.log(pais);
      })
    })*/
    this.activatedRouter.params
    .pipe(
      switchMap((param) => this.paisService.getPaisPorAlpha(param.id)),
      tap(console.log)
    )
    .subscribe(resp => {
      this.pais = resp;
    })
  }

}
