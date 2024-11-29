import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { type ItemDetails } from "../models";

const ITEM_DETAILS_URL = "http://localhost:3000/item/";

@Injectable({
    providedIn: "root",
})
export class ItemDetailsService {
    constructor(private http: HttpClient) {}

    public fetchDetails(itemId: string): Observable<ItemDetails> {
        return this.http.get<ItemDetails>(`${ITEM_DETAILS_URL}${itemId}`);
    }
}
