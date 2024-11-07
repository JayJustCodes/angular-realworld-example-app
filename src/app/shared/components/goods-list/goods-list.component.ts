import { Component, inject, OnInit, DestroyRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoodsItemComponent } from "../goods-item/goods-item.component";
import { GoodsItemsService } from "../../services/goods-items.service";
import { DiscountsService } from "../../services/discounts.service";
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
    private readonly goodsService = inject(GoodsItemsService);

    private readonly discountsService = inject(DiscountsService);

    private readonly destroyRef = inject(DestroyRef);

    sellingItemsList: GoodsItem[] = [];

    discountsList: Discounts[] = [];

    ngOnInit(): void {
        this.loadGoodsItems();
        this.loadDiscounts();
    }

    private loadGoodsItems(): void {
        const subscription = this.goodsService.getGoodsItems().subscribe(
            (data: GoodsItem[]) => {
                this.sellingItemsList = data;
                console.log(this.sellingItemsList);
            },
            (error: any) => {
                console.error("Error fetching goods items", error);
            },
        );
        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }

    private loadDiscounts(): void {
        const subscription = this.discountsService.getDiscounts().subscribe(
            (data: Discounts[]) => {
                this.discountsList = data;
                console.log("discounts", this.discountsList);
            },
            (error: any) => {
                console.error("Error fetching discounts", error);
            },
        );
        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }
}
