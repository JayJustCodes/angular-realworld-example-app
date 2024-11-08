import { Component, Input, OnInit } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { TruncatePipe } from "../../pipes/truncate.pipe";
import { type GoodsItem } from "../../models/goods-item.model";
import { type Discounts } from "../../models/discounts.model";

@Component({
    selector: "app-goods-item",
    standalone: true,
    imports: [CommonModule, CurrencyPipe, TruncatePipe],
    templateUrl: "goods-item.component.html",
    styleUrl: "goods-item.component.css",
})
export class GoodsItemComponent implements OnInit {
    @Input({ required: true }) goodsItem!: GoodsItem;

    @Input() discount: Discounts | null = null;

    get discountValue(): number | null {
        return this.discount?.valuePercentage ?? null;
    }

    get discountEndDate(): string | null {
        return this.discount?.endDate ?? null;
    }

    get discountHighlightedClass(): string | null {
        return this.discountValue && this.discountValue > 50 ? "discount-highlighted" : null;
    }

    get discountedPrice(): number | null {
        return (this.goodsItem?.price != null && this.discountValue != null)
        ? this.goodsItem.price * (1 - this.discountValue / 100)
        : null;
    }

    timeRemaining: string = "";

    private intervalId: any;

    ngOnInit(): void {
        if (this.discountEndDate) {
            this.intervalId = setInterval(() => {
                this.timeRemaining = this.calculateTimeRemaining(this.discountEndDate) || "";
            }, 1000);
        }
    }

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    calculateTimeRemaining(endDate: string | null): string | null {
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

    formatTimeUnit(unit: number): string {
        return unit < 10 ? `0${unit}` : `${unit}`;
    }
}
