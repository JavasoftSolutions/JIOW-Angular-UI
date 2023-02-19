import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceListSetterComponent } from './components/price-list-setter/price-list-setter.component';
import { PriceListComponent } from './components/price-list/price-list.component';

const routes: Routes = [
  // I can't to change names of routers
  { path: 'productDetail', component: PriceListSetterComponent },
  { path: 'productList', component: PriceListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
