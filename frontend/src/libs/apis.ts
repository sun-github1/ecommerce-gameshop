import { Category } from "@/models/category";
import { sanityClient, sanityClientJs } from "./sanity";
import { Game, GameSubSet } from "@/models/game";
import axios from "axios";

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

export const getGamesById = async (itemIds: any): Promise<GameSubSet[]> => {

  const query = `*[_type == "game" && _id in $itemIds]  {
        _id,
        name,
        price,
        quantity,
        images
    }`;

  const games: GameSubSet[] = await sanityClient.fetch({
    query,
    params: { itemIds },
  });
  return games;
}

// export const updateGameQuantity = async (gameId: string, newQuantity: number) => {
//   const patch = sanityClientJs.patch(gameId);

//   // Update the title of the document
//   patch.set({ quantity: newQuantity });

//   // Execute the patch
//   patch.commit().then(() => {
//     console.log('Game Document updated successfully!');
//   });
// }

const callMutation = async (mutation: any) => {
  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } }
  );

  return data;
}

export const updateGameQuantity = async (games: GameSubSet[]) => {
  const mutation = {
    mutations: games.map(({ _id, maxQuantity, quantity }) => {
      return {
        patch: {
          id: _id,
          set: {
            quantity: maxQuantity - quantity,
          },
        },
      };
    }),
  };

  const data = callMutation(mutation);

  return data;
}

//create order
export const createOrder = async (games: GameSubSet[], userEmail: string,
  orderData: {
    totalPrice: number,
  }) => {
  const mutation = {
    mutations: [{
      create: {
        _type: "order",
        items: games.map((game, index) => ({
          game: {
            _key: `game-${game._id}`,
            _type: 'reference',
            _ref: game._id
          },
          quantity: game.quantity,
          _key: `order_${index}`
        })),
        userEmail,
        totalPrice: orderData.totalPrice,
        orderStatus: 'pending'
      }
    }]
  };

  const data = callMutation(mutation);

  return data;
}


export const fetchOrders = async (userEmail: string) => {
  const query = `*[_type == "order" && userEmail =="${userEmail}"]  {
        _id,
        items[] {
          _key,
          quantity,
          game -> {
            _id,
            name,
            price,
            images,
            slug{
              current
            },
            description
          }
        },
        orderStatus,
        totalPrice,
        createdAt
    }`;

  const orders: any = await sanityClient.fetch({
    query
  });
  return orders;
}