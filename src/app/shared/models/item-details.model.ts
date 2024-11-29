type ItemState = "New" | "Second Hand";

interface ImageUrls {
    state: ItemState;
    small: string;
    large: string;
}

export interface ItemDetails {
    id: string;
    title: string;
    description: string;
    reviews: number;
    imageUrls: ImageUrls[];
    quantityAvailable: string;
    state: ItemState[];
}
