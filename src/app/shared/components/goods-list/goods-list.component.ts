import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { forkJoin } from "rxjs";
import { GoodsItemComponent } from "../goods-item/goods-item.component";
import { GoodsItemsService } from "../../services/goods-items.service";
import { DiscountsService } from "../../services/discounts.service";
import { LoggingService } from "../../services/logging.service";
import { type Discounts } from "../../models/discounts.model";
import { type GoodsItem } from "../../models/goods-item.model";

@Component({
    selector: "app-goods-list",
    standalone: true,
    imports: [GoodsItemComponent, CommonModule],
    templateUrl: "./goods-list.component.html",
    styleUrl: "./goods-list.component.css",
})
export class GoodsListComponent implements OnInit {
    constructor(
        private readonly goodsService: GoodsItemsService,
        private readonly discountsService: DiscountsService,
        private readonly loggingService: LoggingService,
    ) {}

    sellingItemsList: GoodsItem[] = [];

    discountsList: Discounts[] = [];

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        forkJoin({
            loadedGoodsItems: this.goodsService.getGoodsItems(),
            loadedDiscountItems: this.discountsService.getDiscounts(),
        }).subscribe({
            next: ({ loadedGoodsItems, loadedDiscountItems }) =>
                this.handleDataLoadSuccess(loadedGoodsItems, loadedDiscountItems),
            error: (error) => this.handleDataLoadError(error),
        });
    }

    private handleDataLoadSuccess(
        loadedGoodsItems: GoodsItem[],
        loadedDiscountItems: Discounts[],
    ): void {
        this.sellingItemsList = loadedGoodsItems;
        this.discountsList = loadedDiscountItems;
        this.loggingService.log("Goods and discounts loaded successfully", { loadedGoodsItems, loadedDiscountItems });
    }

    private handleDataLoadError(error: any): void {
        this.loggingService.error("Failed to load goods or discounts", error);
    }

    getDiscountForItem(itemId: number): Discounts | null {
        return this.discountsList.find((discount) => discount.goods.includes(itemId)) || null;
    }

    getDiscountClass(goodsItemId: number): string {
        const discount = this.getDiscountForItem(goodsItemId);
        return discount && discount.value > 50 ? "large-discounted-item" : "small-discounted-item";
    }
}
