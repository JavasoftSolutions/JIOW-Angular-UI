import { Component, Input, OnInit } from '@angular/core';
import { PriceListService } from 'src/app/services/pricelist.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { Product } from 'src/app/models/product';

//Error Valid class
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
  providers: [PriceListService, ProductService]
})

export class ProductDetailComponent implements OnInit {

  //constructors
  constructor(private priceListService: PriceListService, private productService: ProductService, private router: Router, private fb: FormBuilder) { }

  //FormControlers
  productCode = new FormControl<string | Product>('', [Validators.required]);
  name = new FormControl<string>('', [Validators.required, Validators.minLength(6)]);
  price = new FormControl<any>('', [Validators.min(100)]);
  description = new FormControl<string>('');

  //Error Validator
  matcher = new MyErrorStateMatcher();

  //Product provider
  filteredOptions = new Observable<Product[]>();

  //ONLY for productCode
  private getProductCodeValue(value: string | Product | null): string {
    const code = typeof value === 'string' ? value : value?.code;  //getting .code from product
    return code as string;
  }

  private getValueAsString(value: string | null): string {
    if (value == '') return 'none'; // mightn't work on name because of Validator.reqired
    return value as string;
  }

  ngOnInit() {
    //to activise the autocompleter for productCode
    this.filteredOptions = this.productCode.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        return this.productService.getProductByCodeLike(this.getProductCodeValue(value));
      })
    );
  }

  // doesn't needed
  displayFn(product: Product): string {
    return product && product.code ? product.code : '';
  }


  // form is used to realise saving priceList ONLY
  form: UntypedFormGroup = new UntypedFormGroup({});
  save(form: any): void {
    this.priceListService.savePriceList({
      price: this.price.value,
      name: this.getValueAsString(this.name.value),
      description: this.getValueAsString(this.description.value),
      productCode: this.getProductCodeValue(this.productCode.value)
    }).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/productList'])
      }
    )
  }
}
