import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Discounts } from "../models/discounts.model";

const DISCOUNTS_URL = "http://localhost:3000/discounts";

@Injectable({
    providedIn: "root",
})
export class DiscountsService {
    private http: HttpClient = inject(HttpClient);

    getDiscounts(): Observable<Discounts[]> {
        return this.http.get<Discounts[]>(DISCOUNTS_URL);
    }
}
