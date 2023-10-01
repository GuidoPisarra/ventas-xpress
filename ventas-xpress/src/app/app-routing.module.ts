import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VigiaGuard } from './vigia.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    //loadChildren: () => import('./pages/index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./pages/producto/producto.module').then(m => m.ProductoPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./pages/editar/editar.module').then(m => m.EditarPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'egresos',
    loadChildren: () => import('./pages/egresos/egresos.module').then(m => m.EgresosPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'index/tab1',
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'scanner',
    loadChildren: () => import('./pages/scanner/scanner.module').then(m => m.ScannerPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'index/tab2',
    loadChildren: () => import('./pages/scanner/scanner.module').then(m => m.ScannerPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'index/tab3',
    loadChildren: () => import('./pages/ventas/ventas.module').then(m => m.VentasPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'ventas',
    loadChildren: () => import('./pages/ventas/ventas.module').then(m => m.VentasPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'control-precios',
    loadChildren: () => import('./pages/control-precios/control-precios.module').then(m => m.ControlPreciosPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'stock',
    loadChildren: () => import('./pages/stock/stock.module').then(m => m.StockPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'modify-stock/:id',
    loadChildren: () => import('./pages/modify-stock/modify-stock.module').then(m => m.ModifyStockPageModule)
  },
  {
    path: 'balance',
    loadChildren: () => import('./pages/balance/balance.module').then(m => m.BalancePageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'codigos-qr',
    loadChildren: () => import('./pages/codigos-qr/codigos-qr.module').then(m => m.CodigosQRPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'backup',
    loadChildren: () => import('./pages/backup/backup.module').then(m => m.BackupPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'lista-productos',
    loadChildren: () => import('./pages/lista-productos/lista-productos.module').then(m => m.ListaProductosPageModule),
    canActivate: [VigiaGuard]

  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'create-acount',
    loadChildren: () => import('./pages/create-acount/create-acount.module').then(m => m.CreateAcountPageModule),
    canActivate: [VigiaGuard]

  },  {
    path: 'cambio',
    loadChildren: () => import('./pages/cambio/cambio.module').then( m => m.CambioPageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
