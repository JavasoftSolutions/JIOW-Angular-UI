import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';

@Injectable()
export class CustomerService {

    private customerUrl = 'http://localhost:8080/customer';
    constructor(private http: HttpClient) { }

    getCustomer() {
        return this.http.get<Array<Customer>>(this.customerUrl);
    }

    getCustomerById(id: string) {
        return this.http.get<Array<Customer>>(this.customerUrl + "?id=" + id);
    }

    saveCustomer(customer: Customer) {
        return this.http.post<Customer>(this.customerUrl, customer);
    }
}