import GameCard from "@/components/GameCard/GameCard";
import HeroSection from "@/components/HeroSection/HeroSection";
import Link from "next/link";
import Image from 'next/image';
import GameCategoryCard from "@/components/GameCategoryCard/GameCategoryCard";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import { getCategories, getGames, getRecentGames } from "@/libs/apis";

export default async function Home() {

  const categories = await getCategories();
  const games = await getGames();
  const trendingGames = games?.filter(game => game.isTrending);
  const featuredGame = games?.find(game => game.isFeatured);
  const recentGames = await getRecentGames();
  return (
    <>
      <HeroSection showLink />
      <section className={sectionClassNames.section}>
        <div className={sectionClassNames.trending}>
          <h2 className={sectionClassNames.trendingTitle}>
            Currently Trending Games
          </h2>
        </div>
        <div className="flex gap-8 flex-wrap">
          {trendingGames?.map(game => <GameCard
            key={game._id}
            gameName={game.name}
            imageUrl={game.images[0].url}
            slug={game.slug.current}
            price={game.price} />)}
        </div>
      </section>

      {featuredGame && (<section className={sectionClassNames.featured}>
        <div className={sectionClassNames.featured}>
          <h2 className={featuredClassNames.gameName}>
            {featuredGame.name}
          </h2>
          <p className={featuredClassNames.gameDetails}>
            {featuredGame.description}
          </p>
          <Link href={`/games/${featuredGame.slug.current}`}>
            <Image
              src={featuredGame.images[0].url}
              className={featuredClassNames.gameImage}
              alt={featuredGame.name}
              height={500}
              width={500}
            />
          </Link>
        </div>
      </section>)}

      <section className={featuredGamesSection.categorySection}
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1592155931584-901ac15763e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGxheSUyMHN0YXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60')"
        }}>
        <div className={featuredGamesSection.categoryContent}>
          <h2 className={featuredGamesSection.categoryHeading}>Categories</h2>
          <p className={featuredGamesSection.categorySubHeading}>
            Explore a wide range of games, offering thrilling adventures,
            challenging sports, and immersive action gameplay. Discover new
            worlds, compete with friends, and embark on epic quests that will
            keep you entertained for hours.
          </p>
          <div className="flex flex-wrap">
            {categories && categories.map(category => (
              <GameCategoryCard key={category._id}
                gamecategory={{
                  categoryName: category.name,
                  categoryImage: category.image,
                  slug: category.slug.current
                }} />
            ))}
          </div>
        </div>
      </section>

      <section className={recentGamesClasses.section}>
        <h2 className={recentGamesClasses.heading}>Our Recent Games</h2>
        <p className={recentGamesClasses.subHeading}>
          Stay ahead of the Gaming Curve with out atest Games.
        </p>
        <div className="flex rounded gap-8 flex-wrap py-10">
          {recentGames?.map(game => (<GameCard
            key={game._id}
            gameName={game.name}
            imageUrl={game.images[0].url}
            slug={game.slug.current}
            price={game.price} />
          ))}
        </div>
        <Link href="games" className={sectionClassNames.latestButton}>See All</Link>
      </section>

      <NewsLetter />
    </>
  )
}

const recentGamesClasses = {
  section: "py-16 lg:py-36 px-4 lg:px-36 text-white text-center",
  heading: "text-3xl lg:text-4xl font-bold mb-3",
  subHeading: "text-gray-400 max-w-xl mx-auto lg:text-lg",
};

const featuredGamesSection = {
  categorySection:
    "bg-center bg-cover bg-no-repeat py-16 sm:py-20 md:py-28 lg:py-32",
  categoryContent: "container mx-auto px-4 sm:px-6 md:px-8",
  categoryHeading:
    "text-center max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-primary font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 leading-[130%,187%,130%,130%]",
  categorySubHeading:
    "text-center bg-primary-gradient px-8 rounded-3xl py-5 max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-8",
};

const sectionClassNames = {
  section: "px-6 sm:px-12 md:px-20 lg:px-36 mx-auto py-8 text-white",
  trending: "flex flex-col sm:flex-row items-center justify-between mb-8",
  trendingTitle: "font-bold text-3xl sm:mr-4",
  trendingButton:
    "mt-4 sm:mt-0 px-6 py-2 rounded-md bg-primary hover:bg-primary-dark",
  latestButton:
    "mt-4 sm:mt-0 px-6 py-2 rounded-md bg-primary-gradient border-2 border-primary-dark",
  featured: "pb-24 px-6 sm:px-12 md:px-20 lg:px-36 text-white",
  featuredContent: "mx-auto max-w-screen-xl",
};

const featuredClassNames = {
  gameName: "font-bold text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-8",
  gameDetails: "max-w-screen-md text-sm mb-8 md:mb-12",
  gameImage: "h-72 md:h-96 lg:h-112 w-full object-cover rounded-lg",
};

// const games = [
//   {
//     id: 1,
//     price: 12,
//     name: "Call of Duty: Modern Warfare",
//     slug: "call-of-duty",
//     image:
//       "https://images.unsplash.com/photo-1602673221577-0b56d7ce446b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Q2FsbCUyMG9mJTIwRHV0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
//   },
//   {
//     id: 2,
//     price: 14,
//     name: "Assassin's Creed Valhalla",
//     slug: "assassin-creed",
//     image:
//       "https://images.unsplash.com/photo-1586325194227-7625ed95172b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8QXNzYXNzaW4ncyUyMENyZWVkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
//   },
//   {
//     id: 3,
//     price: 42,
//     name: "FIFA 23",
//     slug: "fifa-23",
//     image:
//       "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxheSUyMHN0YXRpb24lMjBmaWZhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
//   },
//   {
//     id: 4,
//     price: 27,
//     name: "The Legend of Zelda: Breath of the Wild",
//     slug: "the-legend-of-zelda",
//     image:
//       "https://images.unsplash.com/photo-1500856056008-859079534e9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGVnZW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
//   },
// ];

const featuredGame = {
  name: "Eternal Domination",
  description: "Immerse yourself in the thrilling criminal underworld of Los Santos in this action-packed open-world adventure. Take on heists, explore a vast city, and live out your criminal fantasies.",
  slug: "eternal-domination",
  image: "/images/trending.jpeg"
};


// const categories = [
//   {
//     id: 1,
//     name: "Action",
//     slug: "action",
//     image:
//       "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlnaHR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
//   },
//   {
//     id: 2,
//     name: "Adventure",
//     slug: "adventure",
//     image:
//       "https://images.unsplash.com/photo-1536751048178-14106afab4f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFjaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
//   },
//   {
//     id: 3,
//     name: "Sports",
//     slug: "sports",
//     image:
//       "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3BvcnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
//   },
// ];