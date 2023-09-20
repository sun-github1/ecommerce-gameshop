import { Category } from "./category";


export interface Game {
    _id: string;
    price: number;
    name: string;
    slug: { current: string};
    images: Array<{
        _key: string;
        url: string; 
        file: string;
    }>;
    isFeatured: boolean;
    isTrending: boolean;
    category: Category;
    quantity: number;
    description: string;
}