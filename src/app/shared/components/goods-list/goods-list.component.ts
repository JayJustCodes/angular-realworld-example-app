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
    styleUrl: "./goods-list.component.css"
})
export class GoodsListComponent implements OnInit {
    goodsItemsService = inject(GoodsItemsService);

    sellingItemsList: GoodsItem[] = [];

    private destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        const subscription = this.goodsItemsService.getGoodsItems().subscribe((data) => {
            this.sellingItemsList = data;
        });

        console.log(this.sellingItemsList);

        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }
}
