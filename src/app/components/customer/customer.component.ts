import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { Observable, toArray, startWith, switchMap } from 'rxjs';


export class CustomerErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService],
})
export class CustomerComponent implements OnInit {

  constructor(private router: Router, private customerService: CustomerService) { }

  customer = [{ name: "Birlik", password: "java8080" }]


  name = new FormControl<string | Customer>('', [Validators.required]);
  password = new FormControl<string | Customer>('', [Validators.required]);
  matcher = new CustomerErrorStateMatcher();

  private customerAccess(): boolean {
    if (this.name.value == this.customer[0].name && this.password.value == this.customer[0].password) return true;
    return false;
  }

  ngOnInit(): void {
  }

  inClick(): void {
    if (this.customerAccess() == true) this.router.navigate(['/priceList']);
  }

}
  // filteredOptions = new Observable<Customer[]>();
  // private customerNameFinder(value: string | Customer | null): string {
  //   const name = typeof value === 'string' ? value : value?.name;
  //   return name as string;
  // }
  // private customerCodeAutocompleteForm(): void {
  //   this.filteredOptions = this.name.valueChanges.pipe(
  //     startWith(''),
  //     switchMap(value => {
  //       return this.customerService.getCustomerName(this.customerNameFinder(value));
  //     })
  //   );
  // }
  // this.customerCodeAutocompleteForm();

  // displayFn(customer: Customer): string {
  //   return customer && customer.name ? customer.name : '';
  // }
