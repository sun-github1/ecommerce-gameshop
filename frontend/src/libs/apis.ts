import { Category } from "@/models/category";
import sanityClient from "./sanity";
import { Game, GameSubSet } from "@/models/game";

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

export const getCategory = async (slug: string): Promise<Category> => {
  const query = `*[_type == "category" && slug.current=="${slug}"] [0] {
        _id,
        name,
        slug {current},
        image,
        subtitle
    }`;

  const category: Category = await sanityClient.fetch({ query });
  return category;
}

export const getGames = async (): Promise<Game[]> => {
  const query = `*[_type == "game"]  {
        _id,
        name,
        price,
        images,
        "imageFile": images[0].file.asset->url,
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

  const games: Game[] = await sanityClient.fetch({
    query, config: {
      cache: 'no-cache'
    }
  });
  return games;

}

export const getRecentGames = async (): Promise<Game[]> => {
  const query = `*[_type == "game"] | order(_createdAt desc)[0...4] {
        _id,
        name,
        price,
        "imageFile": images[0].file.asset->url,
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
  return games;

}

export const getGame = async (slug: string): Promise<Game> => {
  const query = `*[_type == "game" && slug.current=="${slug}"] [0] {
    _id,
    name,
    price,
    "imageFile": images[0].file.asset->url,
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
  const game: Game = await sanityClient.fetch({ query });
  return game;
}

export const getGamesByCategory = async (slug: string): Promise<Game[]> => {
  const query = `*[_type == "game" && category->slug.current=="${slug}"]  {
        _id,
        name,
        price,
        images,
        description,
        isFeatured,
        isTrending,
        quantity,
        category -> {
            name,
            subtitle
        }
        
    }`;

  const games: Game[] = await sanityClient.fetch({ query });
  return games;
}

export const getGamesById = async (itemIds: Array<string>): Promise<GameSubSet[]> => {
  const query = `*[_type == "game" && _id in $itemIds"]  {
        _id,
        name,
        price,
        quantity
    }`;

  const games: GameSubSet[] = await sanityClient.fetch({ 
    query, 
    params: { itemIds} 
  });

  return games;
}