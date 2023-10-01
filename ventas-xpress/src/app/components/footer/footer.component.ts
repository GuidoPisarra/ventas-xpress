import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  protected usuario: boolean = this.storage.getRol() === 'USER';
  constructor(
    private routes: Router,
    private storage: StorageService
  ) { }

  ngOnInit() { }
  public goTo(route: string) {
    this.routes.navigate([route])
  }
}
