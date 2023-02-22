import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceListSetterComponent } from './components/price-list-setter/price-list-setter.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'priceListSetter', component: PriceListSetterComponent },
  { path: 'priceList', component: PriceListComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'main', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
