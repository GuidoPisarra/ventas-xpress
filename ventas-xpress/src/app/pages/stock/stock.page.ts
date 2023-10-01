import { RestService } from './../../service/rest.service';
import { Router } from '@angular/router';
import { ProductModel } from './../../models/productModel';
import { LocalRestService } from './../../service/local-rest.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage {
  public products: Array<ProductModel> = [];
  public results: Array<ProductModel> = [];
  protected cargando: boolean = true;

  constructor(
    public localRest: LocalRestService,
    public rest: RestService,
    public router: Router,
    private platform: Platform
  ) { }

  ionViewDidEnter() {
    this.results = [];
    this.products = [];
    this.cargando = true;
    const stock: Observable<any> = this.rest.getProducts();
    stock.subscribe(response => {
      response['datos'].forEach((item: ProductModel) => {
        this.products.push(item);
      });

      this.results = this.products;
      this.cargando = false;
    });

  }


  editProduct(id: number) {
    this.router.navigate(['modify-stock/' + id]);
  }

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.products.filter(d => d.description.toLowerCase().indexOf(query) > -1);
  }

  async printContent(): Promise<any> {
    if (this.products.length > 0) {
      this.platform.ready().then(() => {
        let printContents: any, popupWin: any;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin?.document.open();

        popupWin.document.write(`
            <html>
              <head>
                <title>Imprimir Contenido</title>
                <style>
                  .list {
                    display: inline-block;
                  }
                  .cardQr {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-right: 20px;
                  }
                  img {
                    height: 120px;
                    width: 120px;
                  }
                  .descripcion {
                    display:flex;
                    max-width: 110px !important;
                    word-wrap: break-word !important;
                    overflow-y: visible !important;
                    margin-left: 20px;
                  }
                  table {
                    margin: auto;
                  }
                  th, td {
                    padding: 5px 10px;
                    text-align: center;
                  }
                  thead {
                    background-color: #eee;
                    font-weight: bold;
                  }
                  .itemProducto{
                    text-align: left;
                  }
                </style>
              </head>
              <body onload="window.print();window.close()">
                <table>
                  <thead>
                    <tr>
                      <th class="itemProducto">Producto</th>
                      <th>Talle</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>`);

        this.products.forEach(async item => {
          popupWin.document.write(`
                    <tr>
                      <td class="itemProducto">`+ item.description + `</td>
                      <td>`+ item.size + `</td>
                      <td>`+ item.quantity + `</td>
                    </tr>`);
        });

        popupWin.document.write(`
                  </tbody>
                </table>
              </body>
            </html>
          `);


        popupWin?.document.close();
      });
    }

  }
}
