import { Component, OnInit } from '@angular/core';
import { PriceList } from '../../models/pricelist';
import { PriceListService } from '../../services/pricelist.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [PriceListService]
})
export class ProductListComponent implements OnInit {

  constructor(private priceListService: PriceListService) { }

  priceList: Array<PriceList> = [];

  displayedColumns: string[] = ['name', 'description', 'price'];

  ngOnInit() {
    this.priceListService.getPriceList()
      .subscribe((data: Array<PriceList>) => this.priceList = data);
  }
}

