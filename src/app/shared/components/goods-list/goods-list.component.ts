import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { GoodsItemComponent } from "../goods-item/goods-item.component";
import { SpinnerComponent } from "../spinner/spinner.component";
import { GoodsItemsService } from "../../services/goods-items.service";
import { DiscountsService } from "../../services/discounts.service";
import { LoggingService } from "../../services/logging.service";
import { LoadingService } from "../../services/loading.service";
import { type Discounts } from "../../models/discounts.model";
import { type GoodsItem } from "../../models/goods-item.model";
import { type DiscountedItems } from "../../models/discounted-items.model";

@Component({
    selector: "app-goods-list",
    standalone: true,
    imports: [GoodsItemComponent, CommonModule, SpinnerComponent],
    templateUrl: "./goods-list.component.html",
    styleUrl: "./goods-list.component.css",
})
export class GoodsListComponent implements OnInit {
    constructor(
        private readonly goodsService: GoodsItemsService,
        private readonly discountsService: DiscountsService,
        private readonly loggingService: LoggingService,
        private readonly loadingService: LoadingService,
    ) {}

    discountedItemsList: DiscountedItems[] = [];

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this.loadingService.show();

        forkJoin({
            loadedGoodsItems: this.goodsService.getGoodsItems(),
            loadedDiscountItems: this.discountsService.getDiscounts(),
        })
            .pipe(
                map(({ loadedGoodsItems, loadedDiscountItems }) => {
                    this.discountedItemsList = loadedGoodsItems.map((item) => {
                        const discountForItem = loadedDiscountItems.find((discount) =>
                            discount.goods.includes(item.id),
                        );

                        return {
                            id: item.id,
                            price: item.price,
                            discountedPrice: discountForItem
                                ? parseFloat(
                                      (item.price * (1 - discountForItem.value / 100)).toFixed(2),
                                  )
                                : null,
                            name: item.name,
                            seller: item.seller,
                            shipping: item.shipping,
                            condition: item.condition,
                            imageUrl: item.imageUrl,
                            discountValue: discountForItem ? discountForItem.value : null,
                            discountEndDate: discountForItem ? discountForItem.endDate : null,
                        };
                    });
                    return { loadedGoodsItems, loadedDiscountItems };
                }),
            )
            .subscribe({
                next: ({ loadedGoodsItems, loadedDiscountItems }) =>
                    this.handleDataLoadSuccess(loadedGoodsItems, loadedDiscountItems),
                error: (error) => this.handleDataLoadError(error),
            });
    }

    private handleDataLoadSuccess(
        loadedGoodsItems: GoodsItem[],
        loadedDiscountItems: Discounts[],
    ): void {
        this.loadingService.hide();
        this.loggingService.log("Goods and discounts loaded successfully", {
            loadedGoodsItems,
            loadedDiscountItems,
        });
    }

    private handleDataLoadError(error: any): void {
        this.loadingService.hide();
        this.loggingService.error("Failed to load goods or discounts", error);
    }
}
