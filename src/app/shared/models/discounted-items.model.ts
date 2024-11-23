import { type GoodsItem } from "./goods-item.model";

export interface DiscountedItem extends GoodsItem {
    discountedPrice: number | null;
    discountValue: number | null;
    discountEndDate: string | null;
}
