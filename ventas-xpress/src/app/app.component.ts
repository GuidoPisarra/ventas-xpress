import { Component } from '@angular/core';
import { StorageService } from './service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  protected usuario: boolean = false;
  constructor(
    private storage: StorageService,
    private router: Router
  ) {
    this.usuario = this.storage.getRol() === 'USER';
  }

  public close_session() {
    this.storage.close_session();
    this.router.navigate(['/']);
  }

}
