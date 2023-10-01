import { RestService } from './../../service/rest.service';
import { ProductModel } from './../../models/productModel';
import { LocalRestService } from 'src/app/service/local-rest.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage {
  listOfProducts: Array<any> = [];
  nombre!: string;
  precioCosto!: number;
  precioVenta!: number;
  cantidad!: number;
  talle!: string;
  id!: number;
  prodToEdit!: ProductModel;
  editarCorrecto: boolean = false;

  constructor(
    private rutaActiva: ActivatedRoute,
    private localRest: StorageService,
    private rest: RestService,
    private route: Router,
    private storage: StorageService
  ) { }

  ionViewDidEnter() {
    this.listOfProducts = this.storage.getProducts();
    let id = parseInt(this.rutaActiva.snapshot.params['id']);
    this.id = id;
    this.listOfProducts.forEach(item => {
      if (item.id === id) {
        console.log(item);
        console.log(item);
        this.nombre = item.description;
        this.cantidad = item.quantity;
        this.talle = item.size;
        this.precioCosto = item.costPrice;
        this.precioVenta = item.salePrice;
      }
    })
  }

  saveProduct() {
    this.listOfProducts.forEach(prod => {
      if (this.id === prod.id) {
        this.prodToEdit = prod;
      }
    });
    this.prodToEdit.salePrice = this.precioVenta;
    this.prodToEdit.description = this.nombre;
    this.prodToEdit.costPrice = this.precioCosto;
    console.log(this.prodToEdit);
    this.rest.editOneProduct(this.prodToEdit);

    this.editarCorrecto = true;
    setTimeout(() => {
      this.route.navigate(['index']);
      this.editarCorrecto = false;
    }, 2000);
  }

}


/*
 this.listOfProducts.forEach(prod=>{
      if (this.id === prod.id){
        this.prodToEdit = prod;
      }
    });
    const payload = {
      "description": this.nombre,
      "costPrice": this.precioCosto,
      "salePrice": this.precioVenta,
      "quantity": this.prodToEdit.quantity,
      "idProveedor": 1,
      "code": this.prodToEdit.code,
      "size": this.prodToEdit.size
    }

    console.log(payload);

    const result = this.rest.addProduct(payload).subscribe(response=>{
        this.listOfProducts.forEach(item=>{
          if(item.id === this.prodToEdit.id){
            item.description = this.prodToEdit.description;
            item.costPrice = this.prodToEdit.costPrice;
            item.salePrice = this.prodToEdit.salePrice;
          }
        })
        this.localRest.postListOfProducts(this.listOfProducts);

        this.editarCorrecto = true;
        setTimeout(() =>{
          this.routes.navigate(['index']);
        },2000);


    },err =>{
      console.log(err)
    });
    this.prodToEdit.salePrice = this.precioVenta;
    this.rest.savePriceOneProduct(this.prodToEdit);
   }

 */
