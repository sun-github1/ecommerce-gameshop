import GameCard from '@/components/GameCard/GameCard';
import NewsLetter from '@/components/NewsLetter/NewsLetter';
import { getGamesByCategory, getCategory } from '@/libs/apis';
import { NextPage } from 'next'
import React from 'react'

interface gameCategoryProps {
  params: { slug: string };
}

const GameCategory: NextPage<gameCategoryProps> = async (props) => {
  const { params: { slug } } = props;

  const games = await getGamesByCategory(slug);
  const category = await getCategory(slug);
  return (
    <>
      <section className={gameCategoryClassNames.hero}>
        <div className={gameCategoryClassNames.heroContent}>
          <div className="lg:w-3/4">
            <h1 className={gameCategoryClassNames.title}>
              {slug.toUpperCase()}
            </h1>
            <p className={gameCategoryClassNames.subtitle}>
              {category.subtitle}
            </p>
          </div>
        </div>
      </section>
      <section className={gameCategoryClassNames.section}>
        <h2 className={gameCategoryClassNames.heading}>
          {`${slug.toUpperCase()} Games`}
        </h2>
        <p className={gameCategoryClassNames.subHeading}>
          Checkout our latest collection of {" "}
          <span className="text-primary">
            {slug}
          </span> games
        </p>
        <div className="flex rounded gap-8 flex-wrap py-10">
          {/* COllection of games */}
          {games && games?.map(game => (<GameCard
            key={game._id}
            gameName={game.name}
            imageUrl={game.images[0].url || game.imageFile}
            slug={slug}
            price={game.price} />
          ))}
        </div>
      </section>

      <NewsLetter/>
    </>
  )
}

export default GameCategory



const gameCategoryClassNames = {
  hero: "relative py-16 md:py-20 bg-cover]",
  heroContent:
    "relative bg-primary-gradient inline-block max-w-screen-xl mx-auto px-4 py-8 md:py-12 lg:px-8 lg:py-20",
  title:
    "text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white",
  subtitle: "mt-2 md:mt-4 max-w-3xl text-sm md:text-xl text-gray-300",
  author: "mt-4 md:mt-6 flex items-center",
  authorAvatar:
    "flex-shrink-0 object-cover h-8 md:h-10 w-8 md:w-10 rounded-full",
  authorName: "ml-2 md:ml-3 text-sm md:text-xl font-medium text-white",
  blogContentWrapper:
    "flex flex-col justify-between max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:flex-row lg:px-8",
  blogImageWrapper: "w-full lg:w-1/3",
  blogImage:
    "w-full h-full object-cover rounded-lg hover:translate-y-2 transition-all duration-500",
  blogMainContent: "w-full lg:w-2/3 mt-6 lg:mt-0 lg:pl-8",
  blogTitle: "text-3xl font-bold text-gray-300",
  blogDate: "mt-2 text-gray-200 text-sm",
  blogText: "mt-4 text-gray-200 leading-7",
  section: "py-16 lg:py-36 px-4 lg:px-36 text-white text-center",
  heading: "text-3xl lg:text-4xl font-bold mb-3",
  subHeading: "text-gray-400 max-w-xl mx-auto lg:text-lg",
  latestButton:
    "mt-4 sm:mt-0 px-6 py-2 rounded-md bg-primary-gradient border-2 border-primary-dark",
};