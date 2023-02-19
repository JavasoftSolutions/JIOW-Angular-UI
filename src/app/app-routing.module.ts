import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceListFillerComponent } from './components/price-list-filler/price-list-filler.component';
import { PriceListComponent } from './components/price-list/price-list.component';

const routes: Routes = [
  { path: 'productDetail', component: PriceListFillerComponent },
  { path: 'productList', component: PriceListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
