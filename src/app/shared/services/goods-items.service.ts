import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GoodsItem } from "../models/goods-item.model";

const GOODS_ITEMS_URL = "assets/mock-data/task-3-2/items.json";

@Injectable({
    providedIn: "root",
})
export class GoodsItemsService {
    private http: HttpClient = inject(HttpClient);

    getGoodsItems(): Observable<GoodsItem[]> {
        return this.http.get<GoodsItem[]>(GOODS_ITEMS_URL);
    }
}
