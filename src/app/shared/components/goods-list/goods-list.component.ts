import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoodsItemComponent, SpinnerComponent } from "../.";
import { LoggingService, LoadingService, DiscountedItemsService } from "../../services";
import { LoadingState, DiscountedItem } from "../../models";

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
        private readonly loggingService: LoggingService,
        private readonly loadingService: LoadingService,
        private readonly discountedItemsService: DiscountedItemsService,
    ) {}

    public ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this.loadingService.setLoading();

        this.discountedItemsService.fetchDiscountedItems().subscribe({
            next: (discountedItems) => this.handleDataLoadSuccess(discountedItems),
            error: (error) => this.handleDataLoadError(error),
        });
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

    public setDiscountedItems(items: DiscountedItem[]) {
        this.discountedItems = items;
    }

    public get discountedItemsList(): DiscountedItem[] {
        return this.discountedItems;
    }
}
