import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GoodsItem } from "../models/goods-item.model";

const GOODS_ITEMS_URL = "http://localhost:3000/items";

@Injectable({
    providedIn: "root",
})
export class GoodsItemsService {
    private http: HttpClient = inject(HttpClient);

    getGoodsItems(): Observable<GoodsItem[]> {
        return this.http.get<GoodsItem[]>(GOODS_ITEMS_URL);
    }
}
