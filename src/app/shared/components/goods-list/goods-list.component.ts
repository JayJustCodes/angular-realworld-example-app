import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { GoodsItemComponent } from "../goods-item/goods-item.component";
import { SpinnerComponent } from "../spinner/spinner.component";
import { GoodsItemsService } from "../../services/goods-items.service";
import { DiscountsService } from "../../services/discounts.service";
import { LoggingService } from "../../services/logging.service";
import { LoadingService } from "../../services/loading.service";
import { type Discounts } from "../../models/discounts.model";
import { type GoodsItem } from "../../models/goods-item.model";
import { type LoadingState } from "../../models/loading-state.model";
import { type DiscountedItem } from "../../models/discounted-items.model";

@Component({
    selector: "app-goods-list",
    standalone: true,
    imports: [GoodsItemComponent, CommonModule, SpinnerComponent],
    templateUrl: "./goods-list.component.html",
    styleUrl: "./goods-list.component.css",
})
export class GoodsListComponent implements OnInit {
    private discountedItems: DiscountedItem[] = [];

    constructor(
        private readonly goodsService: GoodsItemsService,
        private readonly discountsService: DiscountsService,
        private readonly loggingService: LoggingService,
        private readonly loadingService: LoadingService,
    ) {}

    public ngOnInit(): void {
        this.loadData();
    }

    public setDiscountedItems(items: DiscountedItem[]) {
        this.discountedItems = items;
    }

    public get discountedItemsList(): DiscountedItem[] {
        return this.discountedItems;
    }

    private loadData(): void {
        this.loadingService.setLoading();

        this.fetchData().subscribe({
            next: (discountedItems) => this.handleDataLoadSuccess(discountedItems),
            error: (error) => this.handleDataLoadError(error),
        });
    }

    private fetchData(): Observable<DiscountedItem[]> {
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

    private handleDataLoadSuccess(discountedItems: DiscountedItem[]): void {
        this.loadingService.setSuccess(discountedItems);
        this.setDiscountedItems(discountedItems);
        this.loggingService.log("Goods and discounts loaded successfully", discountedItems);
    }

    private handleDataLoadError(error: any): void {
        const errorMessage = "Failed to load goods or discounts";
        this.loadingService.setError(errorMessage);
        this.loggingService.error(errorMessage, error);
    }
}
