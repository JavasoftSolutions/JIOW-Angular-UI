import { Component, Input, OnInit } from '@angular/core';
import { PriceListService } from 'src/app/services/pricelist.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [PriceListService]
})

export class ProductDetailComponent {
  productOptions: string[] = ['P1', 'P2', 'P3'];
  textFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  filteredOptions: Observable<string[]> = new Observable();

  form: FormGroup = new FormGroup({
    price: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    productCode: new FormControl()
  });
  // , private productService: ProductService
  constructor(private priceListService: PriceListService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.filteredOptions = this.textFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // this.productsToArr();
    return this.productOptions.filter(productOption => productOption.toLowerCase().includes(filterValue));
  }

  // private productsToArr(): void {
  //   this.productService.getProduct().pipe(
  //     map(product => product.find(
  //       p => this.productOptions.push(p.code.toString())
  //     ))
  //   );
  // }

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
