import { Category } from "./category";


export interface Game {
    _id: string;
    price: number;
    name: string;
    slug: { current: string };
    images: Array<{
        _key: string;
        url: string;
        file: {
            asset: {
                _ref: string;
            }
        };
    }>;
    isFeatured: boolean;
    isTrending: boolean;
    category: Category;
    quantity: number;
    description: string;
    imageFile: string;
}


export type GameSubSet = Pick<Game,
    "_id" | "price" | "quantity" | "images" | "name">
    & { maxQuantity: number }