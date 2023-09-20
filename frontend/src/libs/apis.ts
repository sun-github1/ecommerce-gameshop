import { Category } from "@/models/category";
import sanityClient from "./sanity";
import { Game } from "@/models/game";

export const getCategories = async (): Promise<Category[]> => {
    const query = `*[_type == "category"]  {
        _id,
        name,
        slug {current},
        image,
        subtitle
    }`;

    const categories: Category[] = await sanityClient.fetch({ query });
    return categories;
}

export const getGames = async (): Promise<Game[]> => {
    try {
        const query = `*[_type == "game"]  {
        _id,
        name,
        price,
        images,
        description,
        isFeatured,
        isTrending,
        quantity,
        'category': *[_id == ^.category._ref][0] {
            name,
            slug {
              current
            }
          },
          slug {
            current
          }
    }`;

        const games: Game[] = await sanityClient.fetch({ query });
        console.log('games', games);
        return games;
    }
    catch (error) {
        console.log('error', error);
        return [];
    }
}