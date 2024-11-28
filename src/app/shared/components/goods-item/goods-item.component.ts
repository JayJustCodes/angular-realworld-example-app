import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { TruncatePipe } from "../../pipes/truncate.pipe";
import { type DiscountedItem } from "../../models";

@Component({
    selector: "app-goods-item",
    standalone: true,
    imports: [CommonModule, CurrencyPipe, TruncatePipe],
    templateUrl: "goods-item.component.html",
    styleUrl: "goods-item.component.css",
})
export class GoodsItemComponent implements OnInit {
    @Input({ required: true }) discountedItem!: DiscountedItem;

    private intervalId: any;

    public timeRemaining: string = "";

    constructor(private router: Router) {}

    public ngOnInit(): void {
        this.startDiscountCountdown();
    }

    public ngOnDestroy(): void {
        this.clearDiscountCountdown();
    }

    get discountHighlightedClass(): string | null {
        return this.discountedItem.discountValue && this.discountedItem.discountValue > 50
            ? "discount-highlighted"
            : null;
    }

    public navigateToDetailsPage(itemId: number): void {
        this.router.navigate(["/item-details", itemId]);
    }

    private startDiscountCountdown(): void {
        if (this.discountedItem.discountEndDate) {
            this.intervalId = setInterval(() => {
                this.timeRemaining =
                    this.calculateTimeRemaining(this.discountedItem.discountEndDate) || "";
            }, 1000);
        }
    }

    private clearDiscountCountdown(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    private calculateTimeRemaining(endDate: string | null): string | null {
        if (!endDate) return null;

        const diff = new Date(endDate).getTime() - new Date().getTime();
        if (diff <= 0) return null;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) {
            return `${days} day${days > 1 ? "s" : ""} ${this.formatTimeUnit(hours)}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
        } else {
            return `${this.formatTimeUnit(hours)}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
        }
    }

    private formatTimeUnit(unit: number): string {
        return unit < 10 ? `0${unit}` : `${unit}`;
    }
}
