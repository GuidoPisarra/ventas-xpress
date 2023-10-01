import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/service/rest.service';
import { StorageService } from 'src/app/service/storage.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  protected cargando: boolean = false;
  protected version = environment.version;
  protected error: boolean = false;
  protected password = '';

  constructor(
    private route: Router,
    private rest: RestService,
    private storage: StorageService
  ) { }

  ngOnInit() {

  }

  protected ingresar(): void {
    this.cargando = true;
    this.error = false;
    const email = (document.querySelector('#email') as HTMLInputElement).value;
    const password = (document.querySelector('#password_input') as HTMLInputElement).value;
    const login = this.rest.login(email, password);
    login.subscribe(response => {
      if (response['token'] !== null) {
        this.storage.set_token(response['token']);
        const rol = response['rol'];
        const id_negocio = response['id_negocio'];
        this.storage.setRol(rol.match(/"ROLE_(.*?)"/)[1]);
        this.storage.setPersona(response['id']);
        this.storage.setNegocio(id_negocio);
        this.route.navigate(['/index']);
        this.cargando = false;
      } else {
        console.log('pass invalida');
        this.cargando = false;
        this.error = true;
        this.password = '';
      }
    }, err => {
      console.log(err);
      this.cargando = false;
      this.error = true;
      this.password = '';
    });

  }

  protected crearCuenta(): void {
    this.route.navigate(['create-acount']);
  }

  protected limpiarMensajes() {
    this.error = false;
  }

  protected cambiar_icono(): void {
    const input_password: any = document.getElementById('password_input');
    const eye_icon: any = document.querySelector('.icono');
    if (input_password.type !== 'text') {
      input_password.type = 'text';
      eye_icon.src = 'assets/icon/eye-solid.svg';
    } else {
      input_password.type = 'password';
      eye_icon.src = 'assets/icon/eye-slash-solid.svg';
    }
  }
}
