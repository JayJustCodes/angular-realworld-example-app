import { Component, inject, OnInit, DestroyRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoodsItemComponent } from "../goods-item/goods-item.component";
import { GoodsItemsService } from "../../services/goods-items.service";
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

    private readonly destroyRef = inject(DestroyRef);

    sellingItemsList: GoodsItem[] = [];

    ngOnInit(): void {
        this.loadGoodsItems();
    }

    private loadGoodsItems(): void {
        const subscription = this.goodsService.getGoodsItems().subscribe(
            (data) => {
                this.sellingItemsList = data;
                console.log(this.sellingItemsList);
            },
            (error) => {
                console.error("Error fetching goods items", error);
            },
        );
        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }
}
