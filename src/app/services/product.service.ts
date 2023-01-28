import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable()
export class ProductService {

    private productUrl = 'http://localhost:8080/product';
    constructor(private http: HttpClient) { }

    getProduct(product: string[]) {
        return this.http.get<Array<Product>>(this.productUrl);
        return product; // не работает
    }

    saveProduct(product: Product) {
        return this.http.post<Product>(this.productUrl, product);
    }
}