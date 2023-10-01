import { RestService } from './../../service/rest.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-precios',
  templateUrl: './control-precios.page.html',
  styleUrls: ['./control-precios.page.scss'],
})
export class ControlPreciosPage implements OnInit {
  porcentaje: number = 0;
  edicionCorrecta: boolean = false;
  cargando: boolean = false;
  constructor(
    private rest: RestService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  savePorcentaje() {
    const a = this.rest.increasePriceWithPercentaje(this.porcentaje);
    this.edicionCorrecta = true;


    const result = this.rest.getProducts().subscribe(response => {
      response.forEach(element => {
        this.cargando = true;
      });
      this.cargando = false;

    }, err => {
      console.log(err);
      alert("error");
    });
    setTimeout(() => {
      this.edicionCorrecta = false;
      this.route.navigate(['index']);
    }, 2000);
  }
}
