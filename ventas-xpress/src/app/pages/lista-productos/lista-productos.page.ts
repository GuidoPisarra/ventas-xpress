import { Component, OnInit } from '@angular/core';
import { ProductModel } from './../../models/productModel';
import { Router } from '@angular/router';
import { RestService } from './../../service/rest.service';
import { LocalRestService } from 'src/app/service/local-rest.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from './../../service/storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage {

  public products: Array<ProductModel> = [];
  public results: Array<ProductModel> = [];
  protected cargando: boolean = true;
  protected usuario: boolean = this.storage.getRol() === 'USER';


  constructor(
    public router: Router,
    public rest: RestService,
    public localRest: LocalRestService,
    private alertController: AlertController,
    private storage: StorageService
  ) {

  }


  ionViewDidEnter() {
    this.products = [];
    this.results = [];
    this.cargando = true;
    console.log(this.cargando);
    this.cargarProductos();
    this.cargando = false;
  }

  protected cargarProductos() {
    this.products = [];
    this.results = [];
    if (!this.storage.listOfProductsIsEmpty()) {
      this.storage.getlistOfProducts().forEach(item => {
        this.results.push(item);
        this.products.push(item);
      });

      this.localRest.postListOfProducts(this.products);
      console.log(this.cargando);
    } else {
      const result: Observable<any> = this.rest.getProducts();
      result.subscribe(response => {
        response['datos'].forEach((element: ProductModel) => {
          this.products.push(element);
          this.results.push(element);
        });
        this.storage.getlistOfProducts();
      }, err => {
        console.log(err);
        this.cargando = false;
      });

    }
  }
  async deleteProduct(id: number, name: string) {
    const alert = await this.alertController.create({
      header: '¿Esta segur@ que desea eliminar ' + name + ' ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            const result = this.rest.deleteProduct(id).subscribe(response => {
              console.log(response);
            }, err => {
              console.log(err)
            });
            let pos = 0;
            this.products.forEach(prod => {
              if (prod.id === id) {
                this.products.splice(pos, 1);
                this.results.splice(pos, 1);
              }
              pos++;
            });
            this.storage.deleteProduct(id);
            this.cargarProductos();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }

  editProduct(id: number) {
    this.router.navigate(['editar/' + id]);
  }

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.products.filter(d => d.description.toLowerCase().indexOf(query) > -1);
  }

  protected reload(): void {
    this.products = [];
    this.results = [];
    const result = this.rest.getProducts().subscribe(response => {
      response.forEach(element => {
        this.products.push(element);
        this.results.push(element);
      });
      this.cargando = false;
      this.storage.getlistOfProducts();
    }, err => {
      console.log(err);
      this.cargando = false;
    });
  }



}
