import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/productModel';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class StorageService {

  protected listOfProducts: Array<ProductModel> = [];

  constructor(
    public http: HttpClient
  ) { }


  getProducts(): Array<ProductModel> {
    let productos = localStorage.getItem('listOfProducts');
    if (productos !== null) {
      this.listOfProducts = JSON.parse(productos);
    }
    return this.listOfProducts;
  }

  saveProducts(list: Observable<any>): void {
    this.listOfProducts = [];
    list.subscribe(response => {
      response['datos'].forEach((element: any) => {
        const prod: ProductModel = new ProductModel(element.code,
          element.id,
          element.description,
          element.cost_price,
          element.size,
          element.quantity,
          element.sale_price,
          element.id_proveedor,
          parseInt(this.getNegocio())
        );
        this.listOfProducts.push(prod);
      });
      localStorage.removeItem('listOfProducts');
      localStorage.setItem('listOfProducts', JSON.stringify(this.listOfProducts));
    })

  }

  public getlistOfProducts(): Array<ProductModel> {
    let list: Array<ProductModel> = [];
    const listLocalStorage: any = localStorage.getItem('listOfProducts');
    const listaJson = JSON.parse(listLocalStorage);
    if (listaJson !== null) {
      listaJson.forEach((element: any) => {
        const item = new ProductModel(element.code, parseInt(element.id), element.description, parseFloat(element.costPrice), element.size, parseInt(element.quantity), parseFloat(element.salePrice), parseInt(element.idProveedor), parseInt(this.getNegocio()));
        list.push(item);
      });
    }
    return list;
  }


  getOneProduct(code: any) {
    this.listOfProducts.forEach(item => {
      if (item.code === code) {
        console.log(item);
      }
    })
  }

  saveSale(carrito: any) {
    carrito.forEach((element: any) => {
      this.listOfProducts.forEach(itemLista => {
        if (element.id === itemLista.id) {
          itemLista.quantity = itemLista.quantity - element.quantity;
        }
      });
    });
  }

  deleteProduct(id: number): void {
    const index = this.listOfProducts.findIndex(item => item.id === id);

    if (index !== -1) {
      this.listOfProducts.splice(index, 1);
    }
    localStorage.removeItem('listOfProducts');
    localStorage.setItem('listOfProducts', JSON.stringify(this.listOfProducts));
  }

  addProduct(payload: any): void {
    console.log(payload);
  }

  salesReport() {
  }

  increasePriceWithPercentaje(percentage: any) {
  }

  addStock(payload: any) {
  }

  editOneProduct(payload: ProductModel) {
  }

  saveExpense(payload: any) {
  }

  getExpenses() {
  }

  getBalance(month: number, year: number) {
  }

  saveSales(payload: any) {
  }

  backupProducts() {
  }

  listOfProductsIsEmpty(): boolean {
    return this.getlistOfProducts().length === 0;
  }

  public set_token(token: string): void {
    localStorage.setItem('token', token);
  }

  public get_token(): string {
    const token = localStorage.getItem('token');
    const t = (token !== null) ? token : '';
    return t;
  }

  public delete_token(): void {
    localStorage.removeItem('token');
  }

  public close_session() {
    this.delete_token();
  }

  public setRol(rol: string): void {
    localStorage.setItem('rol', rol);
  }

  public getRol(): string {
    const rol = localStorage.getItem('rol');
    const r = (rol !== null) ? rol : '';
    return r;
  }


  public setNegocio(negocio: string): void {
    localStorage.setItem('negocio', negocio);
  }

  public getNegocio(): string {
    const negocio = localStorage.getItem('negocio');
    const n = (negocio !== null) ? negocio : '';
    return n;
  }

  public setPersona(idPersona: number) {
    localStorage.removeItem('persona');
    localStorage.setItem('persona', idPersona.toString());
  }

  public getPersona(): number {
    const persona = localStorage.getItem('persona');
    if (persona !== null) {
      return parseInt(persona);
    }
    return 0;
  }
}
