import { Component, OnInit } from '@angular/core';
import { PriceList } from './models/pricelist';
import { PriceListService } from './services/pricelist.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PriceListService]
})
export class AppComponent implements OnInit {

  constructor(private priceListService: PriceListService) { }

  priceList: Array<PriceList> = [];

  title = 'm821-ui';
  displayedColumns: string[] = ['name', 'description', 'price'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.priceListService.getPriceList()
      // clone the data object, using its known Config shape
      .subscribe((data: Array<PriceList>) => this.priceList = data);
  }

}
