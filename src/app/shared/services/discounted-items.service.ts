import { Injectable } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { GoodsItemsService, DiscountsService } from ".";
import { Discounts, GoodsItem, DiscountedItem } from "../models";

@Injectable({
    providedIn: "root",
})
export class DiscountedItemsService {
    constructor(
        private readonly goodsService: GoodsItemsService,
        private readonly discountsService: DiscountsService,
    ) {}

    public fetchDiscountedItems(): Observable<DiscountedItem[]> {
        return forkJoin({
            goods: this.goodsService.getGoodsItems(),
            discounts: this.discountsService.getDiscounts(),
        }).pipe(map(({ goods, discounts }) => this.mapDiscountedItems(goods, discounts)));
    }

    private mapDiscountedItems(goods: GoodsItem[], discounts: Discounts[]): DiscountedItem[] {
        return goods.map((item) => this.createDiscountedItem(item, discounts));
    }

    private createDiscountedItem(item: GoodsItem, discounts: Discounts[]): DiscountedItem {
        const discountForItem = this.findDiscount(item.id, discounts);

        return {
            id: item.id,
            price: item.price,
            discountedPrice: this.calculateDiscountedPrice(item.price, discountForItem?.value),
            name: item.name,
            seller: item.seller,
            shipping: item.shipping,
            condition: item.condition,
            imageUrl: item.imageUrl,
            discountValue: discountForItem ? discountForItem.value : null,
            discountEndDate: discountForItem ? discountForItem.endDate : null,
        };
    }

    private findDiscount(itemId: number, discounts: Discounts[]): Discounts | undefined {
        return discounts.find((discount) => discount.goods.includes(itemId));
    }

    private calculateDiscountedPrice(price: number, discountValue?: number): number | null {
        if (!discountValue) {
            return null;
        }
        return parseFloat((price * (1 - discountValue / 100)).toFixed(2));
    }
}
