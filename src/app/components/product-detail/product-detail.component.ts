import { Component, Input, OnInit } from '@angular/core';
import { PriceListService } from 'src/app/services/pricelist.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
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
  providers: [PriceListService, ProductService]
})

export class ProductDetailComponent implements OnInit {

  productCode = new FormControl<string | Product>('', [Validators.required]);
  name = new FormControl<string>('', [Validators.required]);
  description = new FormControl<string>('', [Validators.required]);
  price = new UntypedFormControl([Validators.required]);
  productOptions: Product[] = [{ code: 'p1', name: 'Milk', description: 'p3' }];
  matcher = new MyErrorStateMatcher();
  filteredOptions = new Observable<Product[]>();

  // form: FormGroup = new FormGroup({
  //   price: new UntypedFormControl(),
  //   name: new UntypedFormControl(),
  //   description: new UntypedFormControl(),
  //   productCoder: new FormControl<string | Product>('', [Validators.required]),
  // });

  constructor(private priceListService: PriceListService, private router: Router, private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    this.filteredOptions = this.productCode.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        const code = typeof value === 'string' ? value : value?.code;
        return this.productService.getProductByCodeLike(code as string);
      })
    );
  }

  displayFn(product: Product): string {
    return product && product.code ? product.code : '';
  }

  save(form: any): void {
    this.priceListService.savePriceList({ price: this.price.value, name: this.name.value as string, description: this.description.value as string, productCode: this.productCode.value as string }).subscribe(  // We need to change productCode saving path
      {
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/productList'])
      }
    )
  }
}
