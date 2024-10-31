export interface GoodsItem {
    id: number;
    discount: number;
    price: number;
    originalPrice: number;
    name: string;
    seller: string;
    shipping: string | null;
    condition: string | null;
    discountEndDate: string | null;
    imageUrl: string;
}
