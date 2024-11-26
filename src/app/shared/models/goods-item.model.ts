export interface GoodsItem {
    id: number;
    price: number;
    name: string;
    seller: string;
    shipping: string | null;
    condition: string | null;
    imageUrl: string;
}
