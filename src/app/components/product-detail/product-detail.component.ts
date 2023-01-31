import { Component, Input, OnInit } from '@angular/core';
import { PriceListService } from 'src/app/services/pricelist.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { Product } from 'src/app/models/product';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [PriceListService]
})
export class ProductDetailComponent {

  // product: Observable<Product[]> = this.productService.getProduct();

  textFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  productArr: Array<Product> = []; // Тут тоже нужно посмотреть!!! (Модели и Сервисы Продукта, а так же product-detail.component.html)
  productAutos: string[] = [];
  filteredOptions: Observable<string[]> = new Observable();

  form: FormGroup = new FormGroup({
    price: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    productCode: new FormControl()
  });

  constructor(private priceListService: PriceListService, private router: Router, private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    this.filteredOptions = this.textFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    // this.product.subscribe((arr: Array<Product>) => this.options = arr);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.productArr.forEach(productArrToString => this.productAutos.push(productArrToString.toString()));
    return this.productAutos.filter(productAuto => productAuto.toLowerCase().includes(filterValue));
  }

  save(form: any): void {
    this.priceListService.savePriceList({ price: this.form.value['price'], name: this.form.value['name'], description: this.form.value['description'], productCode: this.form.value['productCode'] }).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/productList'])
      }
    )
  }
}
